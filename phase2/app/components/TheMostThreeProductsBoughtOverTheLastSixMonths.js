import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const TheMostThreeProductsBoughtOverTheLastSixMonths = () => {
    const [data,setData]=useState([])
    useEffect(()=>{
axios.get("/api/TheMostThreeProductsBoughtOverTheLastSixMonths").then((response)=>{
 setData(response.data)
}).catch((err)=>{
    console.log("error while fetching data")
})
    },[])
  return (
    <div style={{marginTop: '0.5rem'}}><h3>3.The Most Three Products Bought Over The Last Six Months</h3>
    
    <table border="1">
    <tr>
      <th>Product Name</th>
      <th>Number of Sells</th>
    </tr>
     
      {data?.map((stat)=>(
         <tr>
         <td>{stat.productName}</td>
         <td>{stat.quantity}</td>
          
       </tr>
      ))}
     
  </table>
    
    </div>
  )
}
