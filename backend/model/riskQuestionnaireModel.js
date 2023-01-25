console.log("----------------------------");
console.log("user.js");
console.log("----------------------------");

//-----------------------------------------
// imports
//-----------------------------------------
var db = require('../config/dbconfig.js');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var jwtconfig = require('../config/jwtconfig.js')

//-----------------------------------------
// objects / functions
//-----------------------------------------

//-----------------------------------------
// getting the questionnaires by a specific user and displaying them
// taking from the questionnaire results table 
//-----------------------------------------
var questionnairesDB = {
    //for testing purposes
    getAllQuestionnaires: function (callback) {
        var conn = db;

        var sql = `SELECT * FROM questionnaireResults;`;

        conn.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
    },

    getQuestionnairesByUserID: function (user_id, callback) {
        var conn = db;
        var sql = `SELECT id, name, user_score, max_score, date_Taken, image_url FROM questionnaireResults WHERE user_id=?;`;
        conn.query(sql, [user_id], function (err, result) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
    },


    //-----------------------------------------
    // questions table
    //-----------------------------------------
    //for testing purposes
    getAllQuestions: function (callback) {
        var conn = db;

        var sql = `SELECT * FROM questions;`;

        conn.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
    },

    // Qnr = Questionnaire
    getQuestionsByQnrID: function (questionnaireID, callback) {
        var conn = db;

        var sql = `SELECT id, content, max_score FROM questions WHERE questionnaireID=?;`;
        
        conn.query(sql, [questionnaireID], function (err, result) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
    },

}

//-----------------------------------------
// exports
//-----------------------------------------
module.exports = questionnairesDB;
