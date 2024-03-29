import fs from 'fs-extra'

addEventListener("load" , handlePageLoad)
async function handlePageLoad(){
    const balancespan= document.querySelector("#balancespan")
    const itemnamespan= document.querySelector("#itemname")
    const itempricespan= document.querySelector("#itemprice")
    const itemimage= document.querySelector("#productimage")
    const userinfodiv = document.querySelector("#user-info"); 
    const quantityinput = document.querySelector("#quantity-input"); 
    const form = document.querySelector("#form")
    form.addEventListener("submit", handleFormSubmit)
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
async function handleFormSubmit(e){
  const balancespan= document.querySelector("#balancespan")
  const balance = parseInt(balancespan.value)
  e.preventDefault()
  const formobject =formToObject(e.target)
  formobject.total= parseInt(formobject.total)
  if (total<=balance){
    balance= balance-total
    balancespan.innerHTML=balance
    const userinformation = localStorage.getItem("userobject")
    const currentuser= JSON.parse(userinformation)
    currentuser.moneyBalance=balance
    localStorage.setItem(userobject, JSON.stringify(currentuser))
    let url= "data/customers.json"
    const data = await fetch(url)
    const users = await data.json()
    const user= users.find(u => u.id == currentuser.id)
    user.moneyBalance=balance
    await fs.writeJson("./data/customers.json", users)
    alert("Purchase sucssful ")
    


  }else{
    alert("You dont have enough balance to buy this quantitiy of the item")
  }
  // todo.id = Date.now()
  // todos.push(todo)
  // localStorage.todos = JSON.stringify(todos)
  // showTodoList()
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

