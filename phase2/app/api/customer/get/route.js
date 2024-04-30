import { NextResponse } from "next/server";
import { db } from "/lib/db.js";

export async function POST(req) {
    try {
         const data=await req.json();
          const {id}=data; 
const user=await db.customer.findMany({
    where:{
        id:id 
    }
})
return NextResponse.json(user[0]||[]);
    } catch (error) {
        console.log("api/get error", error);
        return new NextResponse("Error while INITIALIZING DB", { status: 501 });
    }
}

 
