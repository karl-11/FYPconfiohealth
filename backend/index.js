//////////////////////////////////////////////////////
// INCLUDES
//////////////////////////////////////////////////////
const express = require("express");
const cors = require("cors");
const mainRoutes = require("./routes/mainRoutes");
const fs = require('fs');


//////////////////////////////////////////////////////
// INIT
//////////////////////////////////////////////////////
const app = express();
const PORT = process.env.PORT || 3000;

//////////////////////////////////////////////////////
// SETUP APP
//////////////////////////////////////////////////////
app.use(cors());
app.use(express.json());

app.use(express.static('../frontend'));

app.use("/api", mainRoutes);

//////////////////////////////////////////////////////
// Database
//////////////////////////////////////////////////////

const sql = require("mssql");

console.log("hey")

sql.connect('Server=fyp-confio-health.cvuvcz34h2lx.ap-northeast-1.rds.amazonaws.com;Database=database;User Id=username;Password=password;Encrypt=true')

async () => {
    console.log("hi");
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect('Server=fyp-confio-health.cvuvcz34h2lx.ap-northeast-1.rds.amazonaws.co;Database=database;User Id=username;Password=password;Encrypt=true')
        const result = await sql.query`select * from users`
        console.log(result)
        console.log("connected!")
    } catch (err) {
        console.log(err)
        // ... error checks
    }
}
// const config = {
//     user: 'admin',
//     password: 'fypconfiohealth',
//     server: 'fyp-confio-health.cvuvcz34h2lx.ap-northeast-1.rds.amazonaws.com',
//     port: 1433,
//     ssl: true,
//     extra: {
//         trustServerCertificate: true,
//         Encrypt: true,
//         IntegratedSecurity: false
//     }
// };

// var conn = new sql.ConnectionPool(config);
// conn.connect(function (err){
//     if (err){
//         console.log(err);
//     }
//     else{
//         console.log('connected')
//     }
// });

// sql.connect(config, function (err) {

//     if (err) console.log(err);

//     let sqlRequest = new sql.Request();

//     let sqlQuery = 'Select * From users';
//     sqlRequest.query(sqlQuery, function (err, data) {
//         if (err) console.log(err)

//         console.table(data);

//         sql.close();
//     });

// });

//////////////////////////////////////////////////////
// DISPLAY SERVER RUNNING
//////////////////////////////////////////////////////
app.listen(PORT, () => {
    console.log(`App listening to port ${PORT}`);
});