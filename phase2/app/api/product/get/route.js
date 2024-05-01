import { NextResponse } from "next/server";
import { db } from "/lib/db.js";

export async function POST(req) {
    try {
         const data=await req.json();
          const {id}=data; 
const product=await db.product.findMany({
    where:{
        id:id 
    }
})

console.log(product[0])
return NextResponse.json(product[0]||[]);
    } catch (error) {
        console.log("api/product/get error", error);
        return new NextResponse("Error while product/get", { status: 501 });
    }
}

 
