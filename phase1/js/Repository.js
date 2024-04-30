class Repository {
    constructor() {
        this.userspath = "data/users.json"
        this.customerspath = "data/customers.json"
        this.sellerpath = "data/sellers.json"
        this.productspath = "data/products.json"
        this.historypath = "data/history.json"
        // this.initialize()
    }
     
    async seedJsonDataToDB() {
        try {
            const allPaths = [
                this.userspath,
                this.customerspath,
                this.sellerpath,
                this.productspath,
                this.historypath,
            ];

            const jsonData = {};

            for (const path of allPaths) {
                const response = await fetch(path);
                const data = await response.json();
                const key = path.split('/').pop().replace('.json', '');
                jsonData[key] = data;
            }

            const response = await fetch('https://handmande-engineer-statistics-page.vercel.app/api/seed', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonData),
            });
 
            if (response.ok) {
                console.log('JSON data seed to DB successfully!',response);
            } else {
                console.error('Failed to send JSON data to backend:', response.statusText);
            }
        } catch (error) {
            console.error('An error occurred while sending JSON data to backend:', error);
        }
    }
 
async getUsers() {
    try {

        console.log("get users was called")
        // Make a GET request to fetch user data from the backend API
        const response = await fetch('https://handmande-engineer-statistics-page.vercel.app/api/users');
        
        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        // Parse the response JSON
        const users = await response.json();
console.log(users,"the users")
        // Return the fetched user data
        return users;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}

    // Modify the getCustomers function to make a GET request to the backend
async getCustomers() {
    try {
        // Make a GET request to fetch customer data from the backend API
        const response = await fetch('https://handmande-engineer-statistics-page.vercel.app/api/customer'); // Adjust the API route as per your backend setup

        // Check if the response is successful (status code 200)
        if (response.ok) {
            // Parse the JSON response and return the customer data
            const data = await response.json();
            return data;
        } else {
            // If the response is not successful, throw an error with the status text
            throw new Error(`Failed to fetch customer data: ${response.statusText}`);
        }
    } catch (error) {
        // If an error occurs during the fetch operation, log the error and return null
        console.error('Error fetching customer data:', error);
        return null;
    }
}

    
   async getProducts() {
     try{
        const response = await fetch(`https://handmande-engineer-statistics-page.vercel.app/api/product`);
        const products=await response.json();
        return products;
     }  catch(err){
    console.log("err retriving products");
     }  

    }




   async  getHistory() {
       try{
        const response = await fetch(`https://handmande-engineer-statistics-page.vercel.app/api/history`);
const history=await response.json()
console.log("history recived",history);
return history;
       }catch(err){

        console.log("error getting histor",err)
       } 

    }
     


    async getCurrentUser() {
        if (localStorage.getItem("userobject")){
console.log(localStorage.getItem("userobject"))
const currUser=JSON.parse(localStorage.getItem("currentUser"))
console.log(currUser)
if(currUser.type === "seller"){
const seller=await this.getSellerById(currUser.id)

localStorage.setItem("userobject", JSON.stringify(seller))
return seller;




}else if(currUser.type == "customer"){
const customer=await this.getCustomerById(currUser.id);
console.log("customer recived",customer);
localStorage.setItem("userobject", JSON.stringify(customer))
return customer;
}


return JSON.parse(localStorage.getItem("userobject"))}
        else{
            return null}
    }





    async updateCurrentCustomer(newUser) {
        try {
            console.log("updateCurrentCustomer was called",newUser)
            const response = await fetch(`https://handmande-engineer-statistics-page.vercel.app/api/customer/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });
            const data=await response.json()
    console.log(data)
            if (response.ok) {
                console.log('Customer data updated successfully on the server');
            } else {
                console.error('Failed to update customer data on the server:', response.statusText);
            }
        } catch (error) {
            console.error('An error occurred while updating customer data on the server:', error);
        }
    }
    

    async getProductById(id){
         
     try{   const response = await fetch('https://handmande-engineer-statistics-page.vercel.app/api/product/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });

        const product=await response.json()
        return product;
    }
    catch (error) { 
        console.error('An error occurred during retriving the product:', error);
        return null;
    }
    }


async searchProduct(name){
    try{
      
        

           const response = await fetch('https://handmande-engineer-statistics-page.vercel.app/api/product/search', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify({ name}),
           });
           const products=await response.json()
           return products;
       }
        catch (error) { 
           console.error('An error occurred during updating the product quantity:', error);
           return null;
       }
}


   async updateProductSaleQuantity(productid, soldQuantity) {
        try{
         const product=await this.getProductById(productid); 
          product.quantity-=soldQuantity;
 
            const response = await fetch('https://handmande-engineer-statistics-page.vercel.app/api/product/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ product}),
            });
            if(response.ok){
                console.log("product updated successfully");
            }
        }
         catch (error) { 
            console.error('An error occurred during updating the product quantity:', error);
            return null;
        }
        

    }





async  getUserByUsernameAndPassowrd(strUserName,strPassword){
try{
    const response = await fetch('https://handmande-engineer-statistics-page.vercel.app/api/users/get', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ strUserName, strPassword }),
    });
    const user=await response.json();
    return user;
}
 catch (error) { 
    console.error('An error occurred during retriving the user:', error);
    return null;
}
}





async  getCustomerById(id){
    try{
        console.log("id for the customer",id)
        const response = await fetch('https://handmande-engineer-statistics-page.vercel.app/api/customer/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });
        const customer=await response.json();
        return customer;
    }
     catch (error) { 
        console.error('An error occurred during retriving the user:', error);
        return null;
    }
    }




    async  getSellerById(id){
        try{
            console.log("id for the customer",id)
            const response = await fetch('https://handmande-engineer-statistics-page.vercel.app/api/seller/get', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            const seller=await response.json();
            return seller;
        }
         catch (error) { 
            console.error('An error occurred during retriving the user:', error);
            return null;
        }
        }
  



    
   async login(strUserName, strPassword) {
        
        const user = await this.getUserByUsernameAndPassowrd(strUserName,strPassword)
        console.log("the user found",user);
    
     
        if (user) {
         
            if (String(user.type) == "customer") {
 
                const customer = await this.getCustomerById(user.id)
             
                console.log("the customer retrived",customer);
                localStorage.setItem("userobject", JSON.stringify(customer))
                


            }
            else if (user.type === "seller") {

                const seller = this.getSellerById(user.id)
                 console.log("the seller we got",seller);
                localStorage.setItem("userobject", JSON.stringify(seller))
            }

        }
        localStorage.setItem("currentUser",JSON.stringify(user));
        return user

    }
    logout(){
        localStorage.removeItem("userobject")
    }
    clear() {
        localStorage.clear()
    }

   async addHistory(purchase) {
         try{
            const response = await fetch('https://handmande-engineer-statistics-page.vercel.app/api/history/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ purchase }),
            });

if(response.ok){
    console.log("added purchase successfully")
}
         }catch(err){
console.log("error while adding purchase to history",err);
         }

    }

    async getCustomerHistory(customerid) {
        try{
            const response = await fetch('https://handmande-engineer-statistics-page.vercel.app/api/history/customerget', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id:customerid }),
            });
    
    if(response.ok){
    console.log("got purchase history successfully")
    }
    const data=await response.json()
    return data;
         }catch(err){
    console.log("error while adding getting to history",err);
         }
    }



   async getSellerHistory(sellerid) {
    try{
        const response = await fetch('https://handmande-engineer-statistics-page.vercel.app/api/history/sellerget', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id:sellerid }),
        });

if(response.ok){
console.log("got purchase successfully")
}
const data=await response.json()
return data;
     }catch(err){
console.log("error while   getting   history",err);
     } }





   async getItemsForSale(sellerid) {
         try{
            const response = await fetch('https://handmande-engineer-statistics-page.vercel.app/api/product/get/forsale', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id:sellerid }),
            });
            const products=await response.json()
            return products;
         }catch(err){
            console.log("error while getItemsForSale",err);
         }
    }
    async addProduct(product) {
        try{
            product.productPrice = parseFloat(product.productPrice);
product.quantity=Number(product.quantity);
 

product.sellerID=Number(product.sellerID)

            const response = await fetch('https://handmande-engineer-statistics-page.vercel.app/api/product/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ product }),
            });
            if(response.ok){
                console.log("items added successfully");
            }
         }catch(err){
            console.log("error while adding product",err);
         }

    }
    async updateProduct(product){
         try{
            product.productPrice = parseFloat(product.productPrice);
product.quantity=Number(product.quantity);
 

product.sellerID=Number(product.sellerID)
product.id=Number(product.id)
            const response = await fetch('https://handmande-engineer-statistics-page.vercel.app/api/product/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ product}),
            });
            if(response.ok){
                console.log("product updated successfully");
            }
         }catch(err){
            console.log("error while updating product",err);
         }

    }

}
