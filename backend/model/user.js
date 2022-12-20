console.log("----------------------------");
console.log("user.js");
console.log("----------------------------");

//-----------------------------------------
// imports
//-----------------------------------------
var db = require('../config/db.js');


//-----------------------------------------
// objects / functions
//-----------------------------------------
var userDB = {

    getAllUsers: function (callback) {
        var conn = db;

        console.log("Connected!");

        var sql = ` SELECT 
                        *
                    FROM 
                        users;`;

        conn.query(sql, function (err, result) {
            conn.end();

            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
    },

    // required - correct
    addUser: function (type, username, email, password, full_name, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = `
                INSERT INTO
                users
                (type, username, email, password, full_name)
                VALUES 
                (?, ?, ?, ?, ?);
                `;
                conn.query(sql, [type, username, email, password, full_name], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        });
    },



}

//-----------------------------------------
// exports
//-----------------------------------------
module.exports = userDB;
