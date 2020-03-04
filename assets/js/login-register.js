
var urlwebapi = "webapiv2.eastus.cloudapp.azure.com:3000/api/v2/";

var Current_token = "";
var Current_UUID = "";
var Current_Secret = "";
var CurrentUser= {};
//User_Signup("Test5","test","Student","w","e");

function User_Signup(emailin,passwordin,accounttypein,firstnamein,lastnamein){
    postData('http://webapiv2.eastus.cloudapp.azure.com:3000/api/v2/Auth/CreateAccount', { email:"emailin",password:"passwordin",accounttype:"accounttypein",firstname:"firstnamein",lastname:"lastnamein" })
        .then((data) => {
            console.log(data); // JSON data parsed by `response.json()` call
            //we Expect the signup to ether return true or false
            if(data.uuid){
                //we got a UUID From the server so the account was created so print sucess
                console.log("Account Created Sucessfully");
                CurrentUser = data
                //TODO add response such as next page?
            }else{
                console.log("Account was not created sucessfully")
                //TODO add response such as error box?
            }
        });
}
function User_login(emailin,passwordin){
    postData('http://webapiv2.eastus.cloudapp.azure.com:3000/api/v2/Auth/Login', { email:"emailin",password:"passwordin"})
        .then((data) => {
            console.log(data); // JSON data parsed by `response.json()` call
            //we Expect the signup to ether return true or false
            if(data.oauth2.token){
                //we got a UUID From the server so the account was created so print sucess
                console.log("Login Sucessfull");
                CurrentUser.AccountData = data;
                Current_token = data.oauth2.token;
                Current_Secret = data.oauth2.secret;
                //TODO add response such as next page?
            }else{
                console.log("Account was not created successfully")
                //TODO add response such as error box?
            }
        });
}
function Get_Profile(){
    if(!Current_token){
        return console.log("Error Login First");
    }
    getData('http://webapiv2.eastus.cloudapp.azure.com:3000/api/v2/data/profile?token='+Current_token)
        .then((data) => {
            console.log(data); // JSON data parsed by `response.json()` call
            //we Expect the signup to ether return true or false
            if(data){
                //we got a UUID From the server so the account was created so print sucess
                console.log("Pulled Data Scuessfully");
                CurrentUser.ProfileData = data;
                //TODO add response such as next page?
            }else{
                console.log("Nothing in Account")
                //TODO add response such as error box?
            }
        });
}

function POST_Profile(){
    if(!Current_token){
        return console.log("Error Login First");
    }
    postData('http://webapiv2.eastus.cloudapp.azure.com:3000/api/v2/data/profile?token='+Current_token, CurrentUser.ProfileData)
        .then((data) => {
            console.log(data); // JSON data parsed by `response.json()` call
            //we Expect the signup to ether return true or false
            if(data){
                //we got a UUID From the server so the account was created so print sucess
                console.log("Pushed Profile Data Scuessfully");
                CurrentUser.ProfileData = data;
                //TODO add response such as next page?
            }else{
                console.log("Nothing in Account")
                //TODO add response such as error box?
            }
        });
}
function UpdateProfile(){
    if(!CurrentUser.ProfileData){
        return console.log("Error No Profile Found Please Login First");
    }
    CurrentUser.ProfileData.info = {firstname:"TestFirst",lastname:"TestLast",phonenumber:"7035555555",email:"Test@test.com"};
    CurrentUser.ProfileData.education = {schoolname:"CapitolTech",degreename:"Testname",degreeyear:"2021"};
    CurrentUser.ProfileData.work = {employername:"BigLootCo",jobtitle:"Loot Finder",timeworked:"2Y"};
    CurrentUser.ProfileData.personal = {bio:"This is the bio section where the bio is",pfp:"www.google.com/loot.jpg"};
    POST_Profile();
}

async function getData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
           // 'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
      //  body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}
