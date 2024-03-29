class Repository {
    constructor() {
        this.userspath = "data/users.json"
        this.customerspath = "data/customers.json"
        this.sellerpath = "data/seller.json"
        this.productspath = "data/products.json"
        this.initialize()
    }
    async initialize() {
        const allpaths = [
            this.userspath, this.customerspath, this.sellerpath, this.productspath

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
    getCurrentUser() {
        if (localStorage.getItem("userobject"))
            return JSON.parse(localStorage.getItem("userobject"))
        else
            return null
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
            else if (user.type === "customer") {

                const sellers = this.getSellers()
                const seller = sellers.find(c => c.id === user.id)
                localStorage.setItem("userobject", JSON.stringify(seller))
            }

        }
        return user

    }
}