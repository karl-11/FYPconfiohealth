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
var reportsDB = {

    getAllreports: function (callback) {
        var conn = db;

        var sql = ` SELECT 
                        *
                    FROM 
                        Report_Folders
                    WHERE
                     userid=?;
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

    getreport: function (callback) {
        var conn = db;

        var sql = ` SELECT 
                        *
                    FROM 
                        Report
                    WHERE
                        folderid = ?;
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

    postreport: function (userid, folderid, content, file_name, file_type, file_size, callback) {
        var conn = db;

        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                console.log('Error on uploading reports');
                return res.status(500).json({ statusMessage: 'Unable to upload report' });
            } else {
                var sql = `
                INSERT INTO
                Report
                (userid, folderid, content, file_name, file_type, file_size)
                VALUES 
                (?, ?, ?, ?, ?, ?);
                `;
                conn.query(sql, [userid, folderid, content, file_name, file_type, file_size], function (err, result) {
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        });
    }
}

    

//-----------------------------------------
// exports
//-----------------------------------------
module.exports = reportsDB;