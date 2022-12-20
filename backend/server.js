console.log("-----------------------------------------");
console.log("server.js");
console.log("-----------------------------------------");

//----------------------------------------------------
// imports
//----------------------------------------------------
const app = require('./controller/app');

//----------------------------------------------------
// configurations
//----------------------------------------------------
const hostname = 'localhost';
const port = 3000;

//----------------------------------------------------
// main
//----------------------------------------------------
// start the server and start instening for incoming request.
app.listen(port, hostname, () => {
    console.log(`Server started and accessible via http://${hostname}:${port}/`);
});
