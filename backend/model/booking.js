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

    viewbooking: function (userid, callback) {
        var conn = db;

        var sql = `                         
        SELECT 
            date, time, location, acceptance
        FROM 
            booking
        WHERE
            userid = ? AND date >= curdate()
		ORDER BY 
            date, time;
                `;

        conn.query(sql,[userid], function (err, result) {

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

    viewallbooking: function ( callback) {
        var conn = db;

        var sql = `                         
        SELECT 
            u.id, u.full_name, u.type, b.date, b.time, b.location, b.acceptance, b.bookingid, b.acceptance
        FROM
            booking b, users u 
        WHERE 
            b.userid = u.id AND b.date >= curdate()
        ORDER BY
            b.date, b.time
        ASC;
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

    acceptBooking: function (bookingid, callback) {
        var conn = db;

        var sql = ` 
        update
            booking
        set 
            acceptance = "accepted"
        Where 
            bookingid = ?;
                    `;

        conn.query(sql, [bookingid], function (err, result) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
    },

    declineBooking: function (bookingid, callback) {
        var conn = db;

        var sql = ` 
        update
            booking
        set 
            acceptance = "declined"
        Where 
            bookingid = ?;
                    `;

        conn.query(sql, [bookingid], function (err, result) {
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