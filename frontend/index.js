console.log("-----------------------------------------");
console.log("FYPCONFIOHEALTH > Frontend > index.js");
console.log("-----------------------------------------");

//----------------------------------------------------
// imports
//----------------------------------------------------
const express = require("express");
const app = express();
const fs = require("fs")

//----------------------------------------------------
// endpoints
//----------------------------------------------------
app.get("/", (req, res) => {
    res.sendFile("./public/homepage.html", { root: __dirname });
});

app.get("/login/", (req, res) => {
    res.sendFile("./public/Login.html", { root: __dirname });
});

//----------------------------------------------------
// configurations
//----------------------------------------------------

app.use(express.static("public"));

const PORT = 3001;

//----------------------------------------------------
// main
//----------------------------------------------------
app.listen(PORT, () => {
    console.log(`Client server has started listening on port ${PORT}`);
});
