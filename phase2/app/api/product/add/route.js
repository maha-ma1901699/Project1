// Import necessary modules
import { NextResponse } from 'next/server';
import { db } from '/lib/db';

// Define the POST request handler for inserting purchase data
export async function POST(req) {
    try {
        // Extract the purchase data from the request body
        const { product } = await req.json();
const all=await  db.product.findMany();
        // Insert the purchase data into the database
        const insertedProduct = await db.product.create({
            data: {
                id:all.length+1,
                productName:product.productName,
                productImg:product.productImg,
                productPrice:product.productPrice,
                sellerID:product.sellerID,
                quantity:product.quantity
            },
        });

        // Log the inserted purchase for debugging
        console.log('Inserted product:', insertedProduct);

        // Return a success response
        return new NextResponse(JSON.stringify({ message: 'Product added successfully', data: insertedProduct }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        // Return an error response if an error occurs
        console.error('Error inserting product data:', error);
        return new NextResponse('Error inserting product data', { status: 500 });
    }
}
