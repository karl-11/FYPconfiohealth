// -------------------------------------------------------
// IMPORT NPM PACKAGES
// -------------------------------------------------------
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require('fs');

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
var hp = require('../model/healthprofile.js');
var access = require('../model/access.js');
var riskQuestionnaire = require('../model/riskQuestionnaireModel.js')
var reportsDB = require('../model/reports.js')

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
var uploadFiles = require("../middleware/uploadFiles.js");

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

            console.log("wrong password or invalid login ")

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

// End point for get all vitals
app.get('/vitals', printDebugInfo, function (req, res) {

    vital.getAllvitals(function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

// End point for get all Selected vitals
app.post('/selectedVitals', printDebugInfo, function (req, res) {

    var userid = req.body.userid;

    vital.getSelectedvitals(userid, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

// End point for get all Not Selected vitals
app.post('/notSelectedVitals', printDebugInfo, function (req, res) {

    var userid = req.body.userid;

    vital.getNotSelectedvitals(userid, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

// End point for add Selected vitals
app.post('/addSelectedVitals', printDebugInfo, function (req, res) {

    var userid = req.body.userid;
    var vitalid = req.body.vitalid;

    vital.addSelectedVitals(userid, vitalid, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

// End point for renove Selected vitals
app.post('/removeSelectedVitals', printDebugInfo, function (req, res) {

    var userid = req.body.userid;
    var vitalid = req.body.vitalid;

    vital.removeSelectedVitals(userid, vitalid, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

// End point for renove Selected vitals
app.post('/getVitalValue', printDebugInfo, function (req, res) {

    var userid = req.body.userid;
    var vitalid = req.body.vitalid;

    vital.getVitalsValue(userid, vitalid, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

app.post('/getBloodPressureValue', printDebugInfo, function (req, res) {

    var userid = req.body.userid;
    var vitalid = req.body.vitalid;

    vital.getBloodPressureValue(userid, vitalid, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

// End point for add Vital Value
app.post('/addVitalValue', printDebugInfo, function (req, res) {

    var userid = req.body.userid;
    var vitalid = req.body.vitalid;
    var vitalvalue = req.body.vital_value;
    var datetimecreated = req.body.datetime;

    vital.addVitalValue(userid, vitalid, vitalvalue, datetimecreated, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});
//  end point to insert new booking record
app.post('/booking', printDebugInfo, function (req, res) {

    //extract data from request body
    var date = req.body.date;
    var time = req.body.time;
    var location = req.body.location;
    var userid = req.body.userid;

    booking.AddBooking(date, time, location, userid, function (err, result) {
        if (!err) {
            var output = {
                "inserted booking": result
            };
            res.status(201).send(output);
        } else {
            res.status(500);
        }
    });
});

// end point for get user booking 
app.post('/viewbooking', printDebugInfo, function (req, res) {
    //extract data from request body
    var userid = req.body.userid;
    booking.viewbooking(userid, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

// end point for get All user booking 
app.get('/viewallbooking', printDebugInfo, function (req, res) {
    booking.viewallbooking(function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

// end point for get All user booking 
app.post('/acceptBooking', printDebugInfo, function (req, res) {
    //extract data from request body
    var bookingid = req.body.bookingid;
    booking.acceptBooking(bookingid, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

// end point for get All user booking 
app.post('/declineBooking', printDebugInfo, function (req, res) {
    //extract data from request body
    var bookingid = req.body.bookingid;

    booking.declineBooking(bookingid, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

//  end point to insert new report 
app.post('/report', printDebugInfo, function (req, res) {

    //extract data from request body
    var date = req.body.date;
    var time = req.body.time;
    var location = req.body.location;

    booking.AddBooking(date, time, location, function (err, result) {
        if (!err) {
            var output = {
                "inserted booking": result
            };
            res.status(201).send(output);
        } else {
            res.status(500);
        }
    });
});

// End point for add blood pressure Value
app.post('/addBloodPressureValue', printDebugInfo, function (req, res) {

    var userid = req.body.userid;
    var vitalid = req.body.vitalid;
    var systolic = req.body.systolic;
    var diastolic = req.body.diastolic;
    var datetimecreated = req.body.datetime;

    vital.addBloodPressureValue(userid, vitalid, systolic, diastolic, datetimecreated, function (err, result) {
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

//end point to delete Medical record
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

//end point to delete Medication record
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

//end point to delete Surgical record
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

// end point to delete a health profile drug allergy record
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

// end point to delete a health profile vaccination record
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

app.post('/getAllSelectedDoctor', printDebugInfo, function (req, res) {

    //extract data from request body
    var patientid = req.body.patientid;

    access.getAllSelectedDoctor(patientid, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

app.post('/getNotSelectedDoctor', printDebugInfo, function (req, res) {

    //extract data from request body
    var patientid = req.body.patientid;

    access.getNotSelectedDoctor(patientid, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

app.post('/getSelectedPatient', printDebugInfo, function (req, res) {

    //extract data from request body
    var doctorid = req.body.doctorid;

    access.getSelectedPatient(doctorid, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

app.post('/deleteSelectedDoctor', printDebugInfo, function (req, res) {

    //extract data from request body
    var patientid = req.body.patientid;
    var doctorid = req.body.doctorid;

    access.deleteSelectedDoctor(patientid, doctorid, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

app.post('/addSelectedDoctor', printDebugInfo, function (req, res) {

    //extract data from request body
    var patientid = req.body.patientid;
    var doctorid = req.body.doctorid;

    access.addSelectedDoctor(patientid, doctorid, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

//endpoint for get all questionnaires (this returns for all users)
app.get('/getAllQnr', function (req, res) {

    riskQuestionnaire.getAllQuestionnaires(function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

//endpoint to get user scores by specific user
app.post('/getQnrUserScoreByUser', function (req, res) {
    var user_id = req.body.user_id;
    riskQuestionnaire.getQuestionnaireUserScoreByUserID(user_id, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});


//endpoint to get all questions from a specific questionnaire
//for testing only
app.get('/getAllQnsByQnr', function (req, res) {

    riskQuestionnaire.getAllQuestions(function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

app.post('/getQnsByQnr', function (req, res) {
    var questionnaireID = req.body.questionnaireID;
    riskQuestionnaire.getQuestionsByQnrID(questionnaireID, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

app.post('/updateScore', function (req, res) {
    var user_score = req.body.user_score;
    var resultsID = req.body.resultsID;
    riskQuestionnaire.submitScore(user_score, resultsID, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

app.post('/insertScore', function (req, res) {
    var user_score = req.body.user_score;
    var user_id = req.body.user_id;
    var questionnaireID = req.body.questionnaireID;
    riskQuestionnaire.insertNewScore(user_score, user_id, questionnaireID, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});


// end point to add a new folder
app.post('/insertFolder', printDebugInfo, function (req, res) {

    //extract data from request body
    var userid = req.body.userid;
    var folderName = req.body.folderName;

    reportsDB.insertFolder(folderName, userid, function (err, result) {
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

// end point to get all folders for a user
app.post('/getAllFoldersForUser', printDebugInfo, function (req, res) {

    //extract data from request body
    var userid = req.body.userid;

    reportsDB.getFoldersForUser(userid, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

// end point to delete a folder
app.post('/deleteFolder', printDebugInfo, function (req, res) {

    //extract data from request body
    var id = req.body.id;

    reportsDB.deleteFolder(id, function (err, result) {
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

// end point to upload image
app.post('/uploadFile', printDebugInfo, function (req, res, next) {

    console.log("here")
    console.log(req.body.input_file)

    var upload = multer({
        storage: uploadFiles.image.storage(),
        fileFilter: function (req, file, callback) {
            var ext = file.originalname.split(".")[1];

            if (ext !== 'png' && ext !== 'jpg' && ext !== 'gif' && ext !== 'jpeg' && ext !== 'pdf') {

                var msg = 'Error - Only images and pdf(s) are allowed'
                var output = {
                    errCode : "file type not supported",
                    msg: msg
                }
                res.status(406).send(output);

                return next();
            }

            callback(null, true)
        },
        limits: {
            fileSize: 3 * 1024 * 1024 //3 mb
        }
    }).single('input_file')

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {

            // if multer error
            res.status(500).send(err);

        } else if (err) {

            // if general error
            res.status(500).send(err);

        } else {

            try {

                // console.log(req.body)

                var file_name = req.file.filename
                var folder_id = req.body.folder_id
                var userid = req.body.user_id
                var display_name = req.body.fileName
                var file_type = req.file.mimetype
                var file_size = req.file.size
                var upload_path = req.file.path

                // call model
                reportsDB.uploadFile(folder_id, file_name, file_type, userid, display_name, file_size, function (err, data) {

                    if (err) {

                        console.log(err)
                        res.status(500).send(err);

                    }
                    // if file name already exists
                    else if (data.success == 'no') {

                        // delete the physical folder we uploaded just now
                        fs.unlinkSync(upload_path);

                        // send response and alert user that it failed
                        res.status(406).send(data);

                    }
                    // everything ok, image stored and uploaded into database
                    else {

                        res.status(200).send(data);

                    }

                })

            } catch (error) {

                res.status(500).send(error.message);
            }

        }
    })
})

// end point to get all files in a folder
app.post('/getFilesInsideFolder', printDebugInfo, function (req, res) {

    //extract data from request body
    var folder_id = req.body.folder_id;

    reportsDB.getFilesInsideFolder(folder_id, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

// end point to get one file to view in detail
app.post('/getFile', printDebugInfo, function (req, res) {

    //extract data from request body
    var file_id = req.body.file_id;

    reportsDB.getFile(file_id, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

// end point to delete a file 
app.post('/deleteFile', printDebugInfo, function (req, res) {

    //extract data from request body
    var file_id = req.body.id;

    reportsDB.getFile(file_id, function (err, result) {

        // if file is found, proceed with delete
        if (!err) {

            // console.log("result -" + result)

            // delete the physical file from the storage folder
            var data = result[0];

            // get the file path and file name to delete
            var file_name = data.file_name;
            var basepath = '../frontend/public/uploads/'
            var filepath = basepath + file_name

            // console.log("filepath " + filepath); 
            fs.unlinkSync(filepath);

            // delete the file record from the database
            reportsDB.deleteFile(file_id, function (err, result) {
                if (!err) {

                    var output = {
                        "affected rows": result.affectedRows
                    };

                    console.log(result);
                    res.status(200).send(output);
                } else {
                    res.status(500);
                    console.log("error");
                }
            });

        }
        // file not found
        else {
            res.status(500);
            console.log("error");
        }
    });


});


module.exports = app;