const repo = new Repository()


addEventListener("load", handleLoad);
async function handleLoad() {
    const historyRows = document.querySelector("#table-history-body");
    const saleRows = document.querySelector("#table-sale-body");
    const buttonadd = document.querySelector("#button-add");
    buttonadd.addEventListener("click" , handleButtonClick)

    // const buttonupload = document.querySelector("#upload-button");
    // buttonupload.addEventListener("click" , handleButtonUploadClick)

    const userinfodiv = document.querySelector("#user-info");
    const seller = repo.getCurrentUser()
    if (seller) {

        userinfodiv.innerHTML = `${seller.companyName}`
        const sellerhistory = repo.getSellerHistory(seller.id)
        const html = sellerhistory.map(h => historyToRow(h)).join('')
        historyRows.innerHTML = html
        const itemsforsale = repo.getItemsForSale(seller.id)
        const html2 = itemsforsale.map(h => itemsforsaleToRow(h)).join('')
        saleRows.innerHTML = html2
        const selleridhidden = document.querySelector("#sellerID");
        selleridhidden.value = seller.id

    }
    else {
        userinfodiv.innerHTML = "no user"
        alert("you have to be a seller and you have to login")
        window.location.href = "login.html"
    }
 
}
function handleButtonClick(e){
    const formcontainer = document.querySelector("#formcontainer")
    formcontainer.classList.remove("hidden")

    const buttonupload = document.querySelector("#upload-button");
    buttonupload.addEventListener("click" , handleButtonUploadClick)
}
function handleButtonUploadClick(){
    const itemform = document.querySelector("#itemform")
    const item = formToObject(itemform)
    repo.addProduct(item)
    alert("Item Added Sucessfully!")
    const formcontainer = document.querySelector("#formcontainer")
    formcontainer.classList.add("hidden")
    window.location.href = "sales.html"
}
function handleEdit(){
    const itemform = document.querySelector("#itemform")
    const item = formToObject(itemform)


    repo.updateProduct(item)
    alert("Item Editted Sucessfully!")
    const formcontainer = document.querySelector("#formcontainer")
    formcontainer.classList.add("hidden")
    window.location.href = "sales.html"  
}

function itemsforsaleToRow(product){
const html = `<tr> <td> <a href = '#' onclick = "editProduct(event,${product.id})">
${product.productName}</a></td> <td>${product.quantity}</td> <td> ${product.productPrice} QR</td></tr>`
return html
}

function historyToRow(history){
    const html = `<tr> <td> ${history.product.productName}</td> <td>${history.date}</td> <td> ${history.customer.name} </td> 
    <td> ${history.quantity} </td> <td> ${history.product.productPrice} </td></tr>`
    return html

}
function formToObject(form){
    const formData = new FormData(form)
    const data = {}
    for (const [key, value] of formData){
        data[key] = value
    }
    return data
  }
  
  function editProduct(event,id){
    event.preventDefault()
    const product = repo.getProduct(id)
    const seller = repo.getCurrentUser()
    
    const itemname = document.querySelector("#itemname")
    const price = document.querySelector("#price") 
    const quantity = document.querySelector("#quantity") 
    const sellerID = document.querySelector("#sellerID") 
    const itemId = document.querySelector("#itemId") 

    itemname.value = product.productName
    price.value = product.productPrice
    quantity.value = product.quantity
    sellerID.value = seller.id
    itemId.value = product.id

    const formcontainer = document.querySelector("#formcontainer")
    formcontainer.classList.remove("hidden")

    const buttonupload = document.querySelector("#upload-button");
    buttonupload.addEventListener("click" , handleEdit)
  }
  