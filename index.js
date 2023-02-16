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

  // saving data through API to dbsqlite.....

   const insertsql = `INSERT INTO loans (
   firstname,
   lastname,
   email,
   purpuse,
   loan_amount 
   ) VALUES (
   "${firstname}",
   "${lastname}",
   "${email}",
   "${purpose}",
   "${amount}"
   )`;
   
   db.serialize(() => {
      db.exec(insertsql,(error) => {
         if (error) {
            response.status(404).json({
               status : false,
               error : error
            })
         } else {
            response.json({
               status : true,
               message : "new loan application added........"
            })
         }
      })
   })
  
});

// Calling API through id in postman app...........

app.get("/loans/:id",(request , response)=>{
   const loan_id = request.params.id;

   const sql = `SELECT * from loans WHERE loan_id=${loan_id}`;
   db.serialize(()=> {
      db.get(sql , (error , row) => {
         if(error || !row) {
            response.status(404).json({
               status : false,
               message : `unable to get laon id on this ${loan_id}`
            })
         }else{
            response.json({
               status : true,
               loan : row
            })
         }
      })
   })
});

// updating data in API throug update syntax in sql.......
app.post("/loans/:id" , (request , response) => {
   const loan_id = request.params.id;
   const requestbody = request.body;
   const status = requestbody.status
   
   const sql = `
   UPDATE loans
   SET status="${status}"
   WHERE loan_id=${loan_id}
 `;

   db.serialize(() => {
      db.get(sql,(error) => {
         if (error) {
            response.status(404).json({
               status : false,
               message : "cant update the data........"
            })
         } else {
            response.json({
               status : true,
               loan_id : loan_id,
               id_status : status
            })
         }
      })
   })

 
});
   
   // error function creating..........
function errormessage (response , errormessage) {
   return response.status(404).json({
       status : false,
       error : errormessage
   })
};



app.listen(3000,"localhost",() => {
    console.log("loan application was running in port http://localhost3000")
});
