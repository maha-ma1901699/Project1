import { NextResponse } from "next/server";
import { db } from "/lib/db.js";

export async function GET() {
    try {
        const customer=await db.customer.findMany();

return NextResponse.json(customer||[]);
    } catch (error) {
        console.log("api/init error", error);
        return new NextResponse("Error while INITIALIZING DB", { status: 501 });
    }
}

 
