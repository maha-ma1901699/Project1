const buttonLogin = document.querySelector("#buttonLogin"); 
const inputUserName = document.querySelector("#username"); 
const inputPassword = document.querySelector("#password"); 

buttonLogin.addEventListener("click", handleLoginClick);

async function handleLoginClick() {
    let strUserName = inputUserName.value 
    let strPassword =inputPassword.value
    let url= "data/users.json"
    const data = await fetch(url)
    const users = await data.json()
    const user= users.find(u => u.username == strUserName && u.password == strPassword)
    if (! user){
        alert ("Invalid username or password")
    } else{
        
        if (user.type === "admin"){
            location.href= "admin.html"

        }else if (user.type === "customer"){
            let url= "data/customers.json"

            const data = await fetch(url)
            const customers = await data.json()
            const customer = customers.find(c=>c.id === user.id)
            localStorage.setItem("username", customer.name +" " + customer.surename)

            location.href= "search.html"
        }
        else if (user.type === "seller"){
            let url= "data/sellers.json"
            const data = await fetch(url)
            const sellers = await data.json()
            const seller = sellers.find(c=>c.id === user.id)
            localStorage.setItem("companyname", seller.companyname)
            location.href= "sales.html"
        } else{
            alert ("User type not known")
        }
    }
}

 