// Import necessary modules
import { NextResponse } from 'next/server';
import { db } from '/lib/db';

// Define the POST request handler
export async function POST(req) {
    try {
        // Extract the product name from the request body
        const { name } = await req.json();

        // Fetch products from the database that match the provided name (case-insensitive)
        const products = await db.product.findMany({
            where: {
                productName: {
                    contains: name,
                    mode: 'insensitive' // Perform case-insensitive search
                }
            }
        });

        // Log the fetched products
        console.log('Fetched products:', products);

        // Return a JSON response containing the fetched products or null if no products match
        return NextResponse.json(products || null);
    } catch (error) {
        // Log any errors that occur during the process
        console.error('Error fetching product data:', error);

        // Return an error response with status code 500 and a descriptive error message
        return new NextResponse('Error fetching product data', { status: 500 });
    }
}
