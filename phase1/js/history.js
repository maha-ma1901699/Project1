const repo = new Repository()


addEventListener("load", handleLoad);
async function handleLoad() {
    const cardsContainer = document.querySelector("#cards");
    const userinfodiv = document.querySelector("#user-info");
    const customer = await repo.getCurrentUser()
    if (customer) {

        userinfodiv.innerHTML = `${customer.name} ${customer.surename}`
        const customerhistory = await repo.getCustomerHistory(customer.id)
        const html = customerhistory.map(h => historyToCard(h)).join('')
        cardsContainer.innerHTML = html
    }
    else {
        userinfodiv.innerHTML = "no user"
    }

}
function historyToCard(history) {
    const purchaseDate = new Date(history.date);
    
    // Format the date to "yyyy-MM-dd"
    const formattedDate = purchaseDate.toISOString().split('T')[0];
    let html = `<div class="item-card">
    <div class="left-side">
        <img src="productImages/${history.product.productImg}" alt="Item 1">
        <h3>${history.product.productName} </h3>
    </div>
    <div class="right-side">
        <div class="item-info">
            <label for="Quantity"><b>Quantity:</b></label>
            <input type="number" id="quantity" value= '${history.quantity}' readonly>
        </div>
        <div class="item-info">
            <label for="price"><b>Price:</b></label>
            <input type="number" id="price" name="price" value='${history.product.productPrice}' readonly>
        </div>
        <div class="item-info">
            <label for="Total"><b>Total:</b></label>
            <input type="number" id="total" name="total" value ='${history.total}'readonly>
        </div>
        <div class="item-info">
                    <label for="date"><b>Purchase Date</b></label>
                    <input type="date" id="date" name="date"  value ='${formattedDate}'readonly>
                </div>
    </div>
</div>`
    return html
}
