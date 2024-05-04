 import axios from 'axios'
import React, { useEffect, useState } from 'react'
 
 export const TopProductsbyTotalRevenueAllTime = () => {
  const [data,setData]=useState([])
  useEffect(()=>{
axios.get("/api/TopProductsbyTotalRevenueAllTime").then((response)=>{
  setData(response.data)
}).catch((err)=>{
  console.log("error while fetching data",err);
})
  },[])
   return (
     <div style={{marginTop: '0.5rem'}}><h3>5.Top Products by Total Revenue (All Time)</h3>
     <table border="1">
    <tr>
      <th>Product Name</th>
      <th>Total Revenue Generated</th>
    </tr>
     
      {data?.map((stat)=>(
         <tr>
         <td>{stat.productName}</td>
         <td>{stat.totalRevenue}</td>
          
       </tr>
      ))}
     
  </table>
     
     </div>
   )
 }
 