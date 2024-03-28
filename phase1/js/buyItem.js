addEventListener("load" , handlePageLoad)
async function handlePageLoad(){
    alert("hello")
    const balancespan= document.querySelector("#balancespan")
    const itemnamespan= document.querySelector("#itemname")
    const itempricespan= document.querySelector("#itemprice")
    const itemimage= document.querySelector("#productimage")
    const userinfodiv = document.querySelector("#user-info"); 
    const quantityinput = document.querySelector("#quantity-input"); 
    quantityinput.addEventListener("change", handleQuantityChange)
    const userinformation = localStorage.getItem("userobject")
    if(userinformation){
        const customer = JSON.parse(userinformation)
        userinfodiv.innerHTML=`${customer.name} ${customer.surename}`
        balancespan.innerHTML=customer.moneyBalance
        let url= "data/products.json"
        const data = await fetch(url)
        const products = await data.json()
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const currentproductid = urlParams.get('productId')
        if (currentproductid){
        const product= products.find(p => p.id ==parseInt(currentproductid) )
            itemnamespan.innerHTML=product.productName
            itempricespan.innerHTML=product.productPrice
            itemimage.src=`productImages/${product.productImg}`


        }
}else{
    alert("you are not logged in")
    window.location.href= "login.html"
}


}

  function handleQuantityChange(e){
    const quantity= parseInt(e.target.value)
    const itempricespan= document.querySelector("#itemprice")
    const productPrice=parseInt(itempricespan.innerHTML)
    const total= quantity*productPrice
    const totalinput= document.querySelector("#total")
    totalinput.value=total

  }  
