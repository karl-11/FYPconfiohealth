console.log("----------------------------");
console.log("vitals.js");
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
var vitalsDB = {

    getAllvitals: function (callback) {
        var conn = db;

        var sql = ` SELECT 
                        * 
                    FROM 
                        vitalsigns
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

    getSelectedvitals: function (userid, callback) {
        var conn = db;

        var sql = ` 
            SELECT 
                * 
            from 
                vitalsSelected 
            WHERE 
                userid = ?
                `;

        conn.query(sql, [userid], function (err, result) {

            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
    },

    getNotSelectedvitals: function (userid, callback) {
        var conn = db;

        var sql = ` 
        SELECT 
            id, vital_sign_type,vital_sign_img 
        From 
            vitalsigns v 
        WHERE NOT EXISTS 
            (Select 
                * 
            from 
                vitalsSelected vs 
            WHERE 
                v.id = vs.vitalsid AND vs.userid = ?);
                `;

        conn.query(sql, [userid], function (err, result) {

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
module.exports = vitalsDB;
