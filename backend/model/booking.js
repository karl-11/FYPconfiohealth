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
            b.date, b.time, b.location, b.acceptance, b.doctorid, u.full_name
        FROM 
            booking b ,users u
        WHERE
            b.userid = ? AND b.date >= curdate() AND b.doctorid = u.id 
		ORDER BY 
            date, time;
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

    AddBooking: function (date, time, location, userid, doctorid, callback) {
        var conn = db;

        var sql = ` INSERT INTO booking
                        (date, time, location, userid, doctorid)
                    VALUES 
                        (?, ?, ?, ?,?);
                    `;

        conn.query(sql, [date, time, location, userid, doctorid], function (err, result) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
    },

    viewmybooking: function (doctorid, callback) {
        var conn = db;

        var sql = `                         
		SELECT 
            u.id, u.full_name, u.type, b.date, b.time, b.location, b.acceptance, b.bookingid, b.acceptance, b.doctorid
        FROM
            booking b, users u 
        WHERE 
            b.userid = u.id AND b.date >= curdate() AND b.doctorid = ?
        ORDER BY
            b.date, b.time
        ASC;
                `;

        conn.query(sql, [doctorid], function (err, result) {

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

    getdoctor: function (callback) {
        var conn = db;

        var sql =
            ` 
                SELECT 
                    id, type, full_name 
                FROM 
                    users 
                WHERE 
                    type = "doctor";
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
}
//-----------------------------------------
// exports
//-----------------------------------------
module.exports = bookingDB;