const sqlite= require('sqlite3').verbose();

// To connect database we need to open connection

const db = new sqlite.Database("./loans.db",sqlite.OPEN_READWRITE,(error) => {
    if (error){
        console.log("unable to connect DB")
    } else {
        console.log("DB connected")
    }
});

db.serialize(() => {
    db.all("SELECT * FROM loans",(errors , rows)=>{
        console.log("rows" , rows)
    })
});

module.exports = db;

// db.serialize(function() {
//   // Get all applications from the loans table
//   // SELECT * from loans;
//   db.each(`SELECT * from loans`, (error, dbRow) => {
//     console.log(":: ERROR ::", error);
//     console.log(":: DB ROW ::", dbRow);
//   })

//   db.all(`SELECT * from loans`, function(error, rows) {
//     console.log("All ROWS", rows);
//   })
// })