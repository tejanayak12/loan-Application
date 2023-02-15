const express = require('express');
const bodyparser = require('body-parser');
const { response } = require('express');
const { request } = require('http');

const db = require("./db.js");
const { error } = require('console');

// Creating a app application using express 

const app = express();

// handling json body request 

app.use(bodyparser.json());

app.get("/" , (request , response )=> {
    response.json({
        status : true,
        message : "Loan application was running succesfully Welcome to app......."
    })
});

// get all loan applications...........
app.get("/loans",(request , response) => {
   db.serialize(() => {
      db.all("SELECT * FROM loans" , (error , rows) => {
         if(error){
            response.json({
               status : false,
               error : error
            })
         }else{
            response.json({
               status : true,
               rows : rows
            })
         }
      })
   }
   )
});
// Post APi for new loan application.............
app.post("/new-loan",(request,response) => {
    const loan_data = request.body

    // const firstName = loan_data.firstName;
  // const lastName = loan_data.lastName;
  // const amount = loan_data.amount;
  // const purpose =loan_data.purpose;
  // const email = loan_data.email;

  // You can do same thing using destructing object
 const {firstname , lastname , amount , purpose,email} = loan_data;

 // error function creating..........

 function errormessage (response , errormessage) {
    return response.status(404).json({
        status : false,
        error : errormessage
    })
 };

 if(!firstname){
    return errormessage(response,"Please provide firstname")
 };

 if(!lastname){
    return errormessage(response,"please provide lastname")
 };
 if(!amount){
    return errormessage(response,"please provide amount")
 };
 if(!purpose){
    return errormessage(response,"please provide purpose")
 };
 if(!email){
    return errormessage(response,"please provide email")
 };


    response.json({
        status : true,
        message : "New-Loan Application Added.....",
        data : loan_data
    })
});


app.listen(3000,"localhost",() => {
    console.log("loan application was running in port http://localhost3000")
});
