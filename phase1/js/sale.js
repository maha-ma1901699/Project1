const repo = new Repository()


addEventListener("load", handleLoad);
async function handleLoad() {
    const cardsContainer = document.querySelector("#cards");
    const userinfodiv = document.querySelector("#user-info");
    const seller = repo.getCurrentUser()
    if (seller) {

        userinfodiv.innerHTML = `${seller.companyName}`
        const sellerhistory = repo.getSellerHistory(seller.id)
        const html = sellerhistory.map(h => historyToCard(h)).join('')
        cardsContainer.innerHTML = html
        const itemsforsale = repo.getItemsForSale(seller.id)
        const html2 = itemsforsale.map(h => itemsforsaleToRow(h)).join('')
        cardsContainer.innerHTML = html2
    }
    else {
        userinfodiv.innerHTML = "no user"
    }
 
}

function itemsforsaleToRow(product){
const html = `<tr> <td> ${product.productName}</td> <td>${product.quantity}</td> <td> ${product.productPrice} QR</td></tr>`
return html
}