import { NextResponse } from "next/server";
import { db } from "/lib/db.js";

export async function POST(req) {
    try {
         const data=await req.json();
          const {strUserName,strPassword}=data; 
const user=await db.user.findMany({
    where:{
        username:strUserName,
        password:strPassword  
    }
})
console.log(user[0])
return NextResponse.json(user[0]||null);
    } catch (error) {
        console.log("api/get error", error);
        return new NextResponse("Error while INITIALIZING DB", { status: 501 });
    }
}

 
