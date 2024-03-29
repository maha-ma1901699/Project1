 class Repository {
    constructor() {
        this.userspath = "data/users.json"
        this.customerspath = "data/customers.json"
        this.sellerpath = "data/seller.json"
        this.productspath = "data/products.json"
        this.initialize ()
    }
    async initialize(){
        const allpaths= [
            this.userspath , this.customerspath , this.sellerpath , this.productspath

        ]
        if(!localStorage.getItem("data_loaded")) {
            for (const path of allpaths) {
                const data = await fetch(path) 
                const objects = await data.json()
                localStorage.setItem(path,JSON.stringify(objects))
                
            }
            localStorage.setItem("data_loaded",true)

        }

    }

    getUsers() {
        const data = JSON.parse(localStorage.getItem(this.userspath))
        return data
    }

    async login(username,password){
        const users = await this.getusers()
        const user= users.find(u => u.username == strUserName && u.password == strPassword)
        return user

    }
}