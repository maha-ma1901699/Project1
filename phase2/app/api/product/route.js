// Import necessary modules
import { NextResponse } from 'next/server';
import { db } from '/lib/db';

// Define the GET request handler
export async function GET() {
    try {
        // Fetch all products from the database
        const products = await db.product.findMany();

        // Return a success response with the products
        return NextResponse.json(products || []);
    } catch (error) {
        // Return an error response if an error occurs
        console.error('Error fetching product data:', error);
        return new NextResponse('Error fetching product data', { status: 500 });
    }
}
