// Import necessary modules
import { NextResponse } from 'next/server';
import { db } from '/lib/db';

// Define the POST request handler for inserting purchase data
export async function POST(req) {
    try {
        // Extract the purchase data from the request body
        const { purchase } = await req.json();
console.log("the purchase recived here ",purchase);
        // Insert the purchase data into the database
        const insertedPurchase = await db.history.create({
            data: purchase,
        });

        // Log the inserted purchase for debugging
        console.log('Inserted purchase:', insertedPurchase);

        // Return a success response
        return new NextResponse(JSON.stringify({ message: 'Purchase added successfully', data: insertedPurchase }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        // Return an error response if an error occurs
        console.error('Error inserting purchase data:', error);
        return new NextResponse('Error inserting purchase data', { status: 500 });
    }
}
