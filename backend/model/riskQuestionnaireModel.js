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
    getAllQuestionnaires: function (callback) {
        var conn = db;

        var sql = `SELECT * FROM questionnaire`;

        conn.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
    },

    getQuestionnaireUserScoreByUserID: function (user_id, callback) {
        var conn = db;
        var sql = `SELECT q.id, q.name, q.max_score, q.image_url , qr.questionnaireID, qr.user_score, qr.date_Taken, qr.user_id
        FROM questionnaire q
        INNER JOIN questionnaireResults qr
        ON q.id = qr.questionnaireID
        WHERE qr.user_id = ?;`;
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

    submitScore: function (user_score, id, callback) {
        var conn = db;

        var sql = `UPDATE questionnaireResults SET user_score =? WHERE id=?`;

        conn.query(sql, [user_score, id], function (err, result) {
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
