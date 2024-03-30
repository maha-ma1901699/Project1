const repo = new Repository()


addEventListener("load", handleLoad);
async function handleLoad() {
    const cardsContainer = document.querySelector("#cards");
    const search_button = document.querySelector("#search_button");
    const userinfodiv = document.querySelector("#user-info");
    const logindiv = document.querySelector("#login");
    const customer = repo.getCurrentUser()
    if (customer) {

        userinfodiv.innerHTML = `${customer.name} ${customer.surename}`
        logindiv.innerHTML = ` <a href="#" onclick='logout()'>  <span class="balance"><b>Logout </b></span> </a>`
    }
    else {
        userinfodiv.innerHTML = "no user"
        logindiv.innerHTML = ` <a href="login.html">  <span class="balance"><b>Login </b></span> </a>`
    }
    search_button.addEventListener("click", handleSearch);


    // alert("hello") 
   
    const productList = repo.getProducts()
    let html = productListToCards(productList)
    //STOPPED HERE!!!
    if (cardsContainer) {
        cardsContainer.innerHTML = html

    }
    else {
        alert("error")
    }
    // cardsContainer.innerHTML = html
    // alert(html)
}
async function handleSearch() {
    const cardsContainer = document.querySelector("#cards");
    const searchText = document.querySelector("#search");
    // let url = "data/products.json"
    // const data = await fetch(url)
    const productList = repo.getProducts()

    if (searchText.value === "") {
        let html = productListToCards(productList)
        cardsContainer.innerHTML = html
    }
    else {
        const filteredproduct = productList.filter(p => p.productName.includes(searchText.value))
        if(filteredproduct.length == 0){
            alert("Item Does Not Exitst!")
           
        }
        let html = productListToCards(filteredproduct)
        cardsContainer.innerHTML = html
    }
}

function productToCard(product) {
    let buttonhtml = `<button type='button' class='btn-add' onclick= 'handleButtonClick(${product.id})'><b>Add</b></button>`
    if(product.quantity==0){
        buttonhtml = ""
    }
    let html = `<div class='item-card'>
    <img src='productImages/${product.productImg}' alt='${product.productName}'>
    <h2>${product.productName}</h2>
    <p>QR${product.productPrice}</p>
    <p>available: ${product.quantity}</p>
    ${buttonhtml}

</div>`
    return html
}
function handleButtonClick(productID) {
    window.location.href = "buyItem.html?productId=" + productID

}

function productListToCards(productList) {
    let html = productList.map(p => productToCard(p)).join('')
    return html
}

function logout(e) {
    // e.preventDefault()
    repo.logout()
    window.location.href = "login.html"
}