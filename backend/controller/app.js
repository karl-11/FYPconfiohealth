// -------------------------------------------------------
// IMPORT NPM PACKAGES
// -------------------------------------------------------
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const jwt = require("jsonwebtoken");

// -------------------------------------------------------
// INIT EXPRESS SERVER
// -------------------------------------------------------
const app = express();

// -------------------------------------------------------
// IMPORT MODEL FILES
// -------------------------------------------------------
const JWT_SECRET = require("../config/jwtconfig.js");

var user = require('../model/user.js');
var faq = require('../model/faqs.js');
var vital = require('../model/vitals');
var booking = require('../model/booking.js');

//-----------------------------------------
// Middleware functions
//-----------------------------------------
/**
 * prints useful debugging infromation about an endpoint 
 * we are going to service 
 * 
 * @param {object} req 
 *  request obejct
 * 
 * @param {object} res 
 *  reponse object
 * 
 * @param {object} next 
 *  reference to the next function to call
 */
var printDebugInfo = function (req, res, next) {
    console.log();
    console.log("--------------[ Debug Info ]--------------");

    console.log("Servicing " + req.url + "...");

    console.log("> req.parms: " + JSON.stringify(req.params));
    console.log("> req.body: " + JSON.stringify(req.body));

    console.log("--------------[ Debug Info Ends ]--------------")
    console.log();

    next();
}

var urlEncodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

//-----------------------------------------
// MF Configurations
//-----------------------------------------

app.use(urlEncodedParser);
app.use(jsonParser);

app.options('*', cors());
app.use(cors());

//-----------------------------------------
// END POINTS
//-----------------------------------------

//sanity check end point
app.get('/', printDebugInfo, (req, res) => {
    console.log("GET > '/' > I'm here (FYP CONFOIO)!");

    res.statusCode = 200;
    res.send("GET > '/' > I'm here (FYP CONFOIO)!");
    res.end();
});

// end point for get all uesrs 
app.get('/users', function (req, res) {

    user.getAllUsers(function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

// end point to login 
app.post("/login", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    console.log("email: " + email);

    if (email == null || email == "" || password == null || password == "") {
        res.status(400).send("Invalid Login details.")
    };

    user.logIn(email, password, (error, result) => {
        if (error) {
            res.status(500).send(error);
            return;
        }

        if (result === null) {
            res.status(401).send();
            return;
        }

        const payload = {
            user_id: result.id,
            user_role: result.type
        };

        jwt.sign(
            //(1) payload
            payload,
            //(2) Secret key
            JWT_SECRET,
            //(3) Signing Algorithm
            { algorithm: "HS256" },
            //(4) Response handler (callback function)
            (error, token) => {
                if (error) {
                    console.log(error);
                    res.status(401).send(error);
                    return;
                }

                console.log("======= PAYLOAD =============")
                console.log(payload)

                res.status(200).send({
                    token: token,
                    user_id: result.id,
                    user_role: result.type
                });
            })
    });
});

//  end point to insert new user record
app.post('/signup', printDebugInfo, function (req, res) {

    //extract data from request body
    var email = req.body.email;
    var password = req.body.password;
    var full_name = req.body.full_name;

    user.signUp(email, password, full_name, function (err, result) {
        if (!err) {
            var output = {
                "inserted id": result.insertId
            };
            res.status(201).send(output);
        } else {
            res.status(500);
        }
    });
});

// end point for get all faqs 
app.get('/faqs', printDebugInfo, function (req, res) {

    faq.getAllFAQs(function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

//test test
module.exports = app;