import { NextResponse } from "next/server";
import { db } from "/lib/db.js";

export async function GET() {
    try {
        const users=await db.user.findMany();

return NextResponse.json(users||[]);
    } catch (error) {
        console.log("api/init error", error);
        return new NextResponse("Error while INITIALIZING DB", { status: 501 });
    }
}

 
