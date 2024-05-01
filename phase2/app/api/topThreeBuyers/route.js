import { NextResponse } from "next/server";
import { db } from "/lib/db.js"; 

export async function GET() {
    try {
        // Retrieve data for the top 3 buyers based on their total amount of purchases
        const topBuyers = await db.history.groupBy({
            by: ['customerid'],
            _sum: {
                total: true,
            },
            orderBy: {
                _sum: {
                    total: 'desc',
                },
            },
            take: 3,
        });
 

        // Process the data to include customer names
        const data = [];
        for (const buyer of topBuyers) {
            const customer = await db.customer.findUnique({
                where: {
                    id: buyer.customerid,
                },
            });
            data.push({
                customerName: `${customer.name} ${customer.surename}`,
                totalSpent: buyer._sum.total,
            });
        }
 

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error in GET endpoint:", error);
        return new NextResponse("Error while retrieving data", { status: 501 });
    }
}
