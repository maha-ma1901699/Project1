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
        alert ("user id =" + user.id)

    }
}

 