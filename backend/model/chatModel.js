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

let chatDB = {
    getAllMessages: function (callback) {
        var conn = db;

        var sql = `SELECT * FROM messages`;

        conn.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
    },

    getAllContacts: function (id, callback) {
        var conn = db;

        var sql = `
        SELECT u.id, p.patientid, u.type, u.full_name, p.doctorid
        FROM users u
        INNER JOIN patient_doctor_access p ON u.id = p.patientid
        WHERE u.id = ?;
        `;

        conn.query(sql, [id], function (err, result) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
    },

    sendMessage: function () {
        var conn = db;

        var sql = `
        INSERT INTO messages (senderID, receiverID, content) VALUES (?, ?, ?);
        `;

        conn.query(sql, [senderID, receiverID, content], function (err, result) {
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
module.exports = chatDB;