const repo = new Repository()


addEventListener("load", handleLoad);
async function handleLoad() {
    const historyRows = document.querySelector("#table-history-body");
    const saleRows = document.querySelector("#table-sale-body");
    const buttonadd = document.querySelector("#button-add");
   
    buttonadd.addEventListener("click" , handleButtonClick)
    const buttonupload = document.querySelector("#upload-button");
   
    buttonupload.addEventListener("click" , handleButtonUploadClick)

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
    }
    else {
        userinfodiv.innerHTML = "no user"
    }
 
}
function handleButtonClick(e){
    const formcontainer = document.querySelector("#formcontainer")
    formcontainer.classList.remove("hidden")
}
function handleButtonUploadClick(){
    const formcontainer = document.querySelector("#formcontainer")
    formcontainer.classList.add("hidden")
}

function itemsforsaleToRow(product){
const html = `<tr> <td> ${product.productName}</td> <td>${product.quantity}</td> <td> ${product.productPrice} QR</td></tr>`
return html
}

function historyToRow(history){
    const html = `<tr> <td> ${history.product.productName}</td> <td>${history.date}</td> <td> ${history.customer.name} </td></tr>`
    return html
}