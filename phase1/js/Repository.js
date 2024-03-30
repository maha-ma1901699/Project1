class Repository {
    constructor() {
        this.userspath = "data/users.json"
        this.customerspath = "data/customers.json"
        this.sellerpath = "data/sellers.json"
        this.productspath = "data/products.json"
        this.historypath = "data/history.json"
        this.initialize()
    }
    async initialize() {
        const allpaths = [
            this.userspath, this.customerspath, this.sellerpath, this.productspath, this.historypath

        ]
        if (!localStorage.getItem("data_loaded")) {
            for (const path of allpaths) {
                const data = await fetch(path)
                const objects = await data.json()
                localStorage.setItem(path, JSON.stringify(objects))

            }
            localStorage.setItem("data_loaded", true)

        }

    }

    getUsers() {
        const data = JSON.parse(localStorage.getItem(this.userspath))
        return data
    }
    getCustomers() {
        const data = JSON.parse(localStorage.getItem(this.customerspath))
        return data
    }
    getSellers() {
        const data = JSON.parse(localStorage.getItem(this.sellerpath))
        return data
    }
    getProducts() {
        const data = JSON.parse(localStorage.getItem(this.productspath))
        return data

    }
    getHistory() {
        const data = JSON.parse(localStorage.getItem(this.historypath))
        return data

    }
    getProduct(id) {
        const product = this.getProducts().find(p => p.id == parseInt(id))
        return product

    }
    getCustomer(id) {
        const customer = this.getCustomers().find(c => c.id == parseInt(id))
        return customer

    }
    getSeller(id) {
        const seller = this.getSellers().find(s => s.id == parseInt(id))
        return seller

    }


    getCurrentUser() {
        if (localStorage.getItem("userobject"))
            return JSON.parse(localStorage.getItem("userobject"))
        else
            return null
    }
    updateCurrentCustomer(newUser) {
        localStorage.setItem("userobject", JSON.stringify(newUser))
        const data = JSON.parse(localStorage.getItem(this.customerspath))
        const index = data.findIndex(d => d.id == newUser.id)
        if (index != -1) {
            data.splice(index,1,newUser)
            localStorage.setItem(this.customerspath,JSON.stringify(data))

        }

    }

    login(strUserName, strPassword) {
        const users = this.getUsers()
        const user = users.find(u => u.username == strUserName && u.password == strPassword)
        if (user) {
            if (user.type === "customer") {

                const customers = this.getCustomers()
                const customer = customers.find(c => c.id === user.id)
                localStorage.setItem("userobject", JSON.stringify(customer))


            }
            else if (user.type === "seller") {

                const sellers = this.getSellers()
                const seller = sellers.find(c => c.id === user.id)
                localStorage.setItem("userobject", JSON.stringify(seller))
            }

        }
        return user

    }
    clear(){
        localStorage.clear()
    }

    addHistory(purchase){
        const history= this.getHistory()
        history.push(purchase)
        localStorage.setItem(this.historypath, JSON.stringify(history))

    }

    getCustomerHistory(customerid){
        const customer = this.getCustomer(customerid)
        const history= this.getHistory().filter(h => h.customerid == customer.id)
        for (const h of history) {
            const product = this.getProduct(h.itemid)
            h.product=product
        }
        return history
    }
    getSellerHistory(sellerid){
        const seller = this.getSeller(sellerid)
        const history= this.getHistory()
        for (const h of history) {
            const product = this.getProduct(h.itemid)
            h.product=product
            const customer = this.getCustomer(h.customerid)
            h.customer = customer

        }

        return history.filter(h => h.product.sellerID == sellerid)
    }
    getItemsForSale(sellerid){
        const seller = this.getSeller(sellerid)
        const items= repo.getProducts().filter(p => p.quantity >0 && p.sellerID== sellerid)
        return items
    }

}