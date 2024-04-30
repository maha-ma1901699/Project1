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
    const seller = await repo.getCurrentUser()
    if (seller) {

        userinfodiv.innerHTML = `${seller.companyName}`
        const sellerhistory = await repo.getSellerHistory(seller.id)
        const html = sellerhistory.map(h => historyToRow(h)).join('')
        historyRows.innerHTML = html
        const itemsforsale = await repo.getItemsForSale(seller.id)
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
async function handleButtonUploadClick(){
    const itemform = document.querySelector("#itemform")
    const item = formToObject(itemform)
    await repo.addProduct(item)
    alert("Item Added Sucessfully!")
    const formcontainer = document.querySelector("#formcontainer")
    formcontainer.classList.add("hidden")
    window.location.href = "sales.html"
}
async function handleEdit(){
    const itemform = document.querySelector("#itemform")
    const item = formToObject(itemform)


    await repo.updateProduct(item)
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
    const purchaseDate = new Date(history.date);
    
    // Format the date to "yyyy-MM-dd"
    const formattedDate = purchaseDate.toISOString().split('T')[0];
    const html = `<tr> <td> ${history.product.productName}</td> <td>${formattedDate}</td> <td> ${history.customer.name} </td> 
    <td> ${history.quantity} </td> <td> ${history.product.productPrice} </td></tr>`
    return html

}
function formToObject(form){
    const formData = new FormData(form)
    const data = {}
    for (const [key, value] of formData) {
        if (value instanceof File) {
            // If the value is a File object, set it to the file name
            data[key] = value.name;
        } else {
            data[key] = value;
        }
    }
    return data
  }
  
  async function editProduct(event,id){
    event.preventDefault()
    const product = await repo.getProductById(Number(id))
    const seller = await repo.getCurrentUser()
    
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
  