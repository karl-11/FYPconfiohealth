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
var hp = require('../model/healthprofile.js');

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
app.get('/faqs', function (req, res) {

    faq.getAllFAQs(function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

// end point for get all HealthProfile General 
app.post('/HPGeneral', function (req, res) {

    var userid = req.body.userid;

    hp.getAllHPGeneral(userid, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

// end point for get all HealthProfile Medical 
app.post('/HPMedical', function (req, res) {

    var userid = req.body.userid;

    hp.getAllHPMedical(userid, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

// end point for get all HealthProfile Medication 
app.post('/HPMedication', function (req, res) {

    var userid = req.body.userid;

    hp.getAllHPMedication(userid, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

// end point for get all HealthProfile Surgical 
app.post('/HPSurgical', function (req, res) {

    var userid = req.body.userid;

    hp.getAllHPSurgical(userid, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

// end point for get all HealthProfile Drug 
app.post('/HPDrug', function (req, res) {

    var userid = req.body.userid;

    hp.getAllHPDrug(userid, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

// end point for get all HealthProfile Vaccination 
app.post('/HPVaccination', function (req, res) {

    var userid = req.body.userid;

    hp.getAllHPVaccination(userid, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

//end point to insert new health profile general record
app.post('/insertHPGeneral', printDebugInfo, function (req, res) {

    //extract data from request body
    var userid = req.body.userid;
    var gender = req.body.gender;
    var date_of_birth = req.body.date_of_birth;
    var blood_type = req.body.blood_type;
    var weight = req.body.weight;
    var height = req.body.height;

    hp.insertHPGeneral(userid, gender, date_of_birth, blood_type, weight, height, function (err, result) {
        if (!err) {
            var output = {
                "inserted id": result.insertId
            };
            res.status(201).send(output);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

//end point to edit existing health profile general record
app.post('/editHPGeneral', printDebugInfo, function (req, res) {

    //extract data from request body
    var userid = req.body.userid;
    var weight = req.body.weight;
    var height = req.body.height;

    hp.updateHPGeneral(weight, height, userid, function (err, result) {
        if (!err) {
            var output = {
                "affectedRows": result.affectedRows,
                "changedRows": result.changedRows
            }
            res.status(200).send(result);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

//end point to insert new health profile medical record
app.post('/insertHPMedical', printDebugInfo, function (req, res) {

    //extract data from request body
    var userid = req.body.userid;
    var text = req.body.text;

    hp.insertHPMedical(userid, text, function (err, result) {
        if (!err) {
            var output = {
                "inserted id": result.insertId
            };
            res.status(201).send(output);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

app.post('/deleteHPMedical', printDebugInfo, function (req, res) {

    //extract data from request body
    var id = req.body.id;

    console.log(id)

    hp.deleteHPMedical(id, function (err, result) {
        if (!err) {
            var output = {
                "affected rows": result.affectedRows
            };
            res.status(200).send(output);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

//end point to insert new health profile Medication record
app.post('/insertHPMedication', printDebugInfo, function (req, res) {

    //extract data from request body
    var userid = req.body.userid;
    var text = req.body.text;

    hp.insertHPMedication(userid, text, function (err, result) {
        if (!err) {
            var output = {
                "inserted id": result.insertId
            };
            res.status(201).send(output);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

app.post('/deleteHPMedication', printDebugInfo, function (req, res) {

    //extract data from request body
    var id = req.body.id;

    hp.deleteHPMedication(id, function (err, result) {
        if (!err) {
            var output = {
                "affected rows": result.affectedRows
            };
            res.status(200).send(output);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

//end point to insert new health profile Surgical record
app.post('/insertHPSurgical', printDebugInfo, function (req, res) {

    //extract data from request body
    var userid = req.body.userid;
    var text = req.body.text;

    hp.insertHPSurgical(userid, text, function (err, result) {
        if (!err) {
            var output = {
                "inserted id": result.insertId
            };
            res.status(201).send(output);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

app.post('/deleteHPSurgical', printDebugInfo, function (req, res) {

    //extract data from request body
    var id = req.body.id;

    hp.deleteHPSurgical(id, function (err, result) {
        if (!err) {
            var output = {
                "affected rows": result.affectedRows
            };
            res.status(200).send(output);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

//end point to insert new health profile Drug record
app.post('/insertHPDrug', printDebugInfo, function (req, res) {

    //extract data from request body
    var userid = req.body.userid;
    var text = req.body.text;

    hp.insertHPDrug(userid, text, function (err, result) {
        if (!err) {
            var output = {
                "inserted id": result.insertId
            };
            res.status(201).send(output);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

app.post('/deleteHPDrug', printDebugInfo, function (req, res) {

    //extract data from request body
    var id = req.body.id;

    hp.deleteHPDrug(id, function (err, result) {
        if (!err) {
            var output = {
                "affected rows": result.affectedRows
            };
            res.status(200).send(output);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

//end point to insert new health profile Vaccination record
app.post('/insertHPVaccination', printDebugInfo, function (req, res) {

    //extract data from request body
    var userid = req.body.userid;
    var text = req.body.text;

    hp.insertHPVaccination(userid, text, function (err, result) {
        if (!err) {
            var output = {
                "inserted id": result.insertId
            };
            res.status(201).send(output);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

app.post('/deleteHPVaccination', printDebugInfo, function (req, res) {

    //extract data from request body
    var id = req.body.id;

    hp.deleteHPVaccination(id, function (err, result) {
        if (!err) {
            var output = {
                "affected rows": result.affectedRows
            };
            res.status(200).send(output);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

module.exports = app;