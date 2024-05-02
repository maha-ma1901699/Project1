import { NextResponse } from "next/server";
import { db } from "/lib/db.js"; 
export async function GET( ) {
    try {
         
        const historyData = await db.history.findMany({
            include: {
                product:true 
            },
          }); 
          // Process the data to extract year and perform grouping
          const groupedData = historyData.reduce((acc, entry) => {
            const year = new Date(entry.date).getFullYear().toString();
            const key = `${entry.product.productName}_${year}`;
        
            if (!acc[key]) {
              acc[key] = {
                productName: entry.product.productName,
                year,
                totalQuantity: 0,
                totalRevenue: 0,
              };
            }
        
            acc[key].totalQuantity += entry.quantity;
            acc[key].totalRevenue += entry.total;
        
            return acc;
          }, {});
        
          const results = Object.values(groupedData); 

return NextResponse.json(results||null);
    } catch (error) {
        console.log("api/get error", error);
        return new NextResponse("Error while INITIALIZING DB", { status: 501 });
    }
}

 
