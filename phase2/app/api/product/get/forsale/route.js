import { NextResponse } from "next/server";
import { db } from "/lib/db.js";

export async function POST(req) {
    try {
        const data = await req.json();
        const { id } = data; 

        // Fetch items for sale by the specified seller ID
        const itemsForSale = await db.product.findMany({
            where: {
                quantity: {
                    gt: 0, // Filter for products with quantity greater than 0
                },
                sellerID: parseInt(id),
            },
        });

        // Log the fetched items for sale
        console.log("Items for sale by seller with ID", id, ":", itemsForSale);

        // Return the fetched items as a JSON response
        return NextResponse.json(itemsForSale || []);
    } catch (error) {
        // Log any errors that occur during the process
        console.error("Error while fetching items for sale:", error);

        // Return an error response
        return new NextResponse("Error while fetching items for sale", { status: 501 });
    }
}
