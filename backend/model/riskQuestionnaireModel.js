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
var questionnairesDB = {

    //for testing purposes
    getAllQuestionnaires: function (callback) {
        var conn = db;

        var sql = `SELECT * FROM questionnaires;`;

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


}


//-----------------------------------------
// exports
//-----------------------------------------
module.exports = questionnairesDB;
