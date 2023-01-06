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
var FAQsDB = {

    getAllFAQs: function (callback) {
        var conn = db;

        var sql = ` SELECT
                        *
                    FROM 
                        FAQs 
                    Where 
                        now() between activeFrom and activeTo
                `;

        conn.query(sql, function (err, result) {

            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
    },

    addFAQs: function (question, answer, activeFrom, activeTo) {
        var conn = db;

        var sql = ` INSERT INTO FAQs 
                        (question, answer, activeFrom, activeTo)
                    VALUES 
                        (?, ?, ?, ?);
                    `;

        conn.query(sql, [email, hash, full_name], function (err, result) {
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
module.exports = FAQsDB;
