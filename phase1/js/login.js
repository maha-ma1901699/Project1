const repo = new Repository()
const buttonLogin = document.querySelector("#buttonLogin"); 
const inputUserName = document.querySelector("#username"); 
const inputPassword = document.querySelector("#password"); 

buttonLogin.addEventListener("click", handleLoginClick);

async function handleLoginClick() {
    let strUserName = inputUserName.value 
    let strPassword =inputPassword.value
    const user = repo.login(strUserName,strPassword)
    if (! user){
        alert ("Invalid username or password")
    } else{
        
        if (user.type === "admin"){
            location.href= "admin.html"

        }else if (user.type === "customer"){
            


            location.href= "search.html"
        }
        else if (user.type === "seller"){
           
            location.href= "sales.html"
        } else{
            alert ("User type not known")
        }
    }
}

 