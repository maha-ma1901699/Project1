import fs from 'fs-extra'
export default class Repository {
    constructor() {
        this.userspath = "data/users.json"
        this.customerspath = "data/customers.json"
        this.sellerpath = "data/seller.json"
        this.productspath = "data/products.json"
    }

    async getusers() {
        const data = await fs.readJSON(this.userspath)
        return data
    }

    async login(username,password){
        const users = await this.getusers()
        const user= users.find(u => u.username == strUserName && u.password == strPassword)
        return user

    }
}