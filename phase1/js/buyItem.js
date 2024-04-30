const repo = new Repository()
let productid
addEventListener("load" , handlePageLoad)
async function handlePageLoad(){
    const balancespan= document.querySelector("#balancespan")
    const itemnamespan= document.querySelector("#itemname")
    const itempricespan= document.querySelector("#itemprice")
    const itemavailable= document.querySelector("#available")

    const itemimage= document.querySelector("#productimage")
    const userinfodiv = document.querySelector("#user-info"); 
    const quantityinput = document.querySelector("#quantity-input"); 
    const form = document.querySelector("#form")
    form.addEventListener("submit", handleFormSubmit)
    quantityinput.addEventListener("change", handleQuantityChange)
    const customer = await repo.getCurrentUser()
    if(customer){
        
        userinfodiv.innerHTML=`${customer.name} ${customer.surename}`
        balancespan.innerHTML=customer.moneyBalance
       
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const currentproductid = urlParams.get('productId')
        productid=parseInt(currentproductid)
        if (currentproductid){
        const product= await repo.getProductById(Number(currentproductid))
            itemnamespan.innerHTML=product.productName
            itempricespan.innerHTML=product.productPrice
            itemimage.src=`productImages/${product.productImg}`
            itemavailable.innerHTML = product.quantity
            quantityinput.max = product.quantity


        }
}else{
    alert("you are not logged in")
    window.location.href= "login.html"
}


}

  function handleQuantityChange(e){
    const quantity= parseInt(e.target.value)
    console.log("q ",quantity)
    const itempricespan= document.querySelector("#itemprice")
    const productPrice=parseInt(itempricespan.innerHTML)
    console.log("price ",productPrice)

    const total= quantity*productPrice
    const totalinput= document.querySelector("#total")
    totalinput.value=total

  }  
async function handleFormSubmit(e){
  const balancespan= document.querySelector("#balancespan")
  let balance = parseInt(balancespan.innerHTML)
  e.preventDefault()
  const formobject =formToObject(e.target)
  formobject.total= parseInt(formobject.total)
  if (formobject.total<=balance){
    balance= balance-formobject.total
    const customer = await repo.getCurrentUser()

    customer.moneyBalance=balance
    await repo.updateCurrentCustomer(customer)
   await repo.updateProductSaleQuantity(productid,parseInt(formobject.quantity))
    balancespan.innerHTML=balance
    const purchase={
      itemid:productid,
      customerid : customer.id,
      quantity: Number(formobject.quantity),
      total: formobject.total

    }
    await repo.addHistory(purchase)
      alert("Purchase sucssful ")
      window.location.href="search.html"


  }else{
    alert(`You dont have enough balance(${balance}) to buy this quantitiy of the item that has total(${formobject.total})`)
  }
 
  form.reset()

}

function formToObject(form){
  const formData = new FormData(form)
  const data = {}
  for (const [key, value] of formData){
      data[key] = value
  }
  return data
}

