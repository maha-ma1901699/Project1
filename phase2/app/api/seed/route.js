import { NextResponse } from "next/server";
import { db } from "/lib/db.js";

export async function GET() {
    try {
        
        

        // Return response with CORS headers
        return new NextResponse("success", { status: 200});
    } catch (error) {
        console.log("api/init error", error);
        return new NextResponse("Error while INITIALIZING DB", { status: 501 });
    }
}

export async function POST(req) {
    try {
        // Enable CORS headers
        const data=await req.json();
         console.log(data)

       const users=await db.user.findMany();
       if(!users[0]){  
         await db.user.createMany({
            data: data.users,
          });
        }
          // Seed Customers
        const customers=await await db.customer.findMany();
        if(!customers[0]){
          await db.customer.createMany({
            data: data.customers,
          });}
          const sellers=await await db.seller.findMany();
          // Seed Sellers
          if(!sellers[0]){
          await db.seller.createMany({
            data: data.sellers,
          });}
      
          const products=await await db.product.findMany();
          // Seed Products
          if(!products[0]){
          await db.product.createMany({
            data: data.products,
          });
        } 
        return NextResponse.json({"data seeded successfully to db":200})
    } catch (error) {
        console.log("api/seed error", error);
        return new NextResponse("Error while seeding data to DB", { status: 501 });
    }
}
