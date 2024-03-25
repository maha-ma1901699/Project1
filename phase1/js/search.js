

addEventListener("load", handleLoad);
async function handleLoad(){ 
    const cardsContainer = document.querySelector("#cards"); 
    const search_button = document.querySelector("#search_button"); 
    const userinfodiv = document.querySelector("#user-info"); 
    const logindiv = document.querySelector("#login"); 
    const userinformation = localStorage.getItem("username")
    if(userinformation){
userinfodiv.innerHTML=userinformation
logindiv.innerHTML=` <a href="login.html">  <span class="balance"><b>Logout </b></span> </a>`
    }
    else{
        userinfodiv.innerHTML="no user"
        logindiv.innerHTML=` <a href="login.html">  <span class="balance"><b>Login </b></span> </a>`
    }
   search_button. addEventListener("click", handleSearch);
    

    // alert("hello") 
    let url= "data/products.json"
    const data = await fetch(url)
    const productList = await data.json()
    let html = productListToCards(productList)
    //STOPPED HERE!!!
    if(cardsContainer) {
        cardsContainer.innerHTML = html

    }
    else{
        alert("error")
    }
    // cardsContainer.innerHTML = html
    // alert(html)
}
async function handleSearch(){
    const cardsContainer = document.querySelector("#cards"); 
    const searchText = document.querySelector("#search"); 
    let url= "data/products.json"
    const data = await fetch(url)
    const productList = await data.json()
if(searchText.value === "") {
    let html = productListToCards(productList)
    cardsContainer.innerHTML = html


}
else{
    const filteredproduct = productList.filter(p=>p.productName.includes(searchText.value))
    
    let html = productListToCards(filteredproduct)
    cardsContainer.innerHTML = html
}
}

function productToCard(product){
    let html = `<div class='item-card'>
    <img src='productImages/${product.productImg}' alt='${product.productName}'>
    <h2>${product.productName}</h2>
    <p>QR${product.productPrice}</p>
    <button type='button' class='btn-add'><b>Add</b></button>
</div>`
return html
}

function productListToCards(productList){
    let html = productList.map(p => productToCard(p)).join('')
    return html
}