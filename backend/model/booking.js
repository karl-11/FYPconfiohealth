console.log("----------------------------");
console.log("booking.js");
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
var bookingDB = {

    getbooking: function (callback) {
        var conn = db;

        var sql = ` SELECT 
                      (date, time, location)
                    FROM 
                        booking
                    WHERE
                        userid = ? ;
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

    AddBooking: function (date, time, location, userid, callback) {
        var conn = db;

        var sql = ` INSERT INTO booking
                        (date, time, location, userid)
                    VALUES 
                        (?, ?, ?, ?);
                    `;

        conn.query(sql, [date, time, location, userid], function (err, result) {
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
module.exports = bookingDB;