import { NextResponse } from "next/server";
import { db } from "/lib/db.js";

export async function GET() {
    try {
        // Retrieve data for the total revenue per product
        const productsRevenue = await db.history.groupBy({
            by: ['itemid'],
            _sum: {
                total: true,
            },
        });

        console.log("Product Revenue:", productsRevenue);

        // Process the data to sum revenue per seller
        const sellerRevenueMap = {};

        for (const product of productsRevenue) {
            // Fetch product details including seller information
            const productDetails = await db.product.findUnique({
                where: {
                    id: product.itemid,
                },
                include: {
                    seller: {
                        select: {
                            companyName: true,
                        },
                    },
                },
            });

            const sellerName = productDetails.seller.companyName;
            const revenue = product._sum.total;

            // Add revenue to existing seller or create a new entry
            if (sellerRevenueMap.hasOwnProperty(sellerName)) {
                sellerRevenueMap[sellerName] += revenue;
            } else {
                sellerRevenueMap[sellerName] = revenue;
            }
        }

        console.log("Seller Revenue Map:", sellerRevenueMap);

        // Convert seller revenue map to array of objects
        const data = Object.entries(sellerRevenueMap).map(([sellerName, totalRevenue]) => {
            return {
                seller: sellerName,
                totalRevenue: totalRevenue,
            };
        });

        console.log("Processed data:", data);

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error in GET endpoint:", error);
        return new NextResponse("Error while retrieving data", { status: 501 });
    }
}
