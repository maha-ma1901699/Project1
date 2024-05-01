// Import necessary modules
import { NextResponse } from 'next/server';
import { db } from '/lib/db';

// Define the PUT request handler
export async function POST(req) {
    try {
        // Extract the customer ID from the params object
       
 
        // Extract the updated customer data from the request body
        const {product} = await req.json();
        
        // Update the customer data in the database
        const updatedProduct = await db.product.update({
            where: { id: product.id },
            data: product,
        });

        // Return a success response
        return new NextResponse(JSON.stringify(updatedProduct), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        // Return an error response if an error occurs
        console.error('Error updating product data:', error);
        return new NextResponse('Error updating product data', { status: 500 });
    }
}
