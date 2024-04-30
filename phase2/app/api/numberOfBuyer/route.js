import { NextResponse } from "next/server";
import { db } from "/lib/db.js"; 

export async function GET() {
    try {
        // Fetch relevant data from the History table
        const historyData = await db.history.findMany({
            select: {
                customer: {
                    select: {
                        id: true,
                        shippingAddress: true
                    }
                }
            }
        });

        // Process the data to count unique customers per location
        const groupedData = historyData.reduce((acc, { customer }) => {
            const { id, shippingAddress } = customer;
            if (!acc[shippingAddress]) {
                acc[shippingAddress] = new Set();
            }
            acc[shippingAddress].add(id);
            return acc;
        }, {});

        // Convert sets to counts
        for (const location in groupedData) {
            groupedData[location] = groupedData[location].size;
        }

        const result = Object.keys(groupedData).map(location => ({
            location,
            numberOfBuyers: groupedData[location]
        }));

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error in GET endpoint:", error);
        return new NextResponse("Error while retrieving data", { status: 501 });
    }
}