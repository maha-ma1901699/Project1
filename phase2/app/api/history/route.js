// Import necessary modules
import { NextResponse } from 'next/server';
import { db } from '/lib/db';

// Define the GET request handler for fetching purchase history
export async function GET() {
    try {
        // Fetch purchase history from the database
        const history = await db.history.findMany();

        // Log the fetched purchase history for debugging
        console.log('Fetched purchase history:', history);

        // Return a success response with the purchase history
        return NextResponse.json(history);
    } catch (error) {
        // Return an error response if an error occurs
        console.error('Error fetching purchase history:', error);
        return new NextResponse('Error fetching purchase history', { status: 500 });
    }
}
