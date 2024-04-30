import { NextResponse } from 'next/server';
import { db } from '/lib/db';

// Define the POST request handler for fetching purchase history
export async function POST(req) {
    try {
        // Extract the seller ID from the request body
        const { id } = await req.json();

        // Fetch the complete purchase history
        const history = await db.history.findMany({
            take:20
        });

        // Fetch all products and customers
        const products = await db.product.findMany();
        const customers = await db.customer.findMany();

        // Create a map for faster lookup
        const productsMap = new Map(products.map(product => [product.id, product]));
        const customersMap = new Map(customers.map(customer => [customer.id, customer]));

        // Iterate over each history item and enrich it with product and customer details
        for (const h of history) {
            // Retrieve product and customer details from the maps
            h.product = productsMap.get(h.itemid);
            h.customer = customersMap.get(h.customerid);
        }

        // Filter the processed history to include only the items associated with the specified seller ID
        const sellerHistory = history.filter(h => h.product?.sellerID === parseInt(id));

        return NextResponse.json(sellerHistory);
    } catch (error) {
        // Return an error response if an error occurs
        console.error('Error fetching purchase history:', error);
        return new NextResponse('Error fetching purchase history', { status: 500 });
    }
}
