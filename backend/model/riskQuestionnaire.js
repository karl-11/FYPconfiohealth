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
var riskQuestionnaireDB = {

    getAllFAQs: function (callback) {
        var conn = db;

        var sql = ` SELECT
                        *
                    FROM 
                        questionnaires 
                    Where 
                        user_id=?
                `;

        conn.query(sql, function (err, result) {

            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
    }
}

//-----------------------------------------
// exports
//-----------------------------------------
module.exports = riskQuestionnaireDB;
