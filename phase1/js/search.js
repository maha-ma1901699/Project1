const cardsContainer = document.querySelector("#cards"); 


addEventListener("load", handleLoad);
async function handleLoad(){
    // alert("hello") 
    let url= "data/products.json"
    const data = await fetch(url)
    const productList = await data.json()
    let html = productListToCards(productList)
    //STOPPED HERE!!!
    cardsContainer.innerHTML = html
    alert(html)
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