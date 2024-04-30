// Import necessary modules
import { NextResponse } from 'next/server';
import { db } from '/lib/db';

// Define the PUT request handler
export async function PUT(req) {
    try {
        // Extract the customer ID from the params object
       
 
        // Extract the updated customer data from the request body
        const newData = await req.json();

        // Update the customer data in the database
        const updatedCustomer = await db.customer.update({
            where: { id: newData.id },
            data: newData,
        });

        // Return a success response
        return new NextResponse(JSON.stringify(updatedCustomer), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        // Return an error response if an error occurs
        console.error('Error updating customer data:', error);
        return new NextResponse('Error updating customer data', { status: 500 });
    }
}
