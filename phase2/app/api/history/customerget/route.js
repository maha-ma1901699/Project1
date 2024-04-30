// Import necessary modules
import { NextResponse } from 'next/server';
import { db } from '/lib/db';

// Define the POST request handler for fetching purchase history
export async function POST(req) {
    try {
        // Extract the seller ID from the request body
        const { id } = await req.json();

        // Fetch the complete purchase history from the database for the specified customer ID
        const history = await db.history.findMany({
            where: {
                customerid: parseInt(id)
            }
        });

        // Iterate over each purchase history entry to retrieve and attach product information
        for (const h of history) {
            const product = await db.product.findUnique({
                where: {
                    id: h.itemid,
                },
            });
            h.product = product;
        }
        console.log("purchase history for customer",history);
        // Return a JSON response containing the modified purchase history with product information
        return NextResponse.json(history);
    } catch (error) {
        // Log any errors that occur during the process
        console.error('Error fetching purchase history:', error);
        
        // Return an error response with status code 500 and a descriptive error message
        return new NextResponse('Error fetching purchase history for customer', { status: 500 });
    }
}
