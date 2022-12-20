console.log("----------------------------");
console.log("user.js");
console.log("----------------------------");

//-----------------------------------------
// imports
//-----------------------------------------
var db = require('../config/dbconfig.js');


//-----------------------------------------
// objects / functions
//-----------------------------------------
var userDB = {

    getAllUsers: function (callback) {
        var conn = db;

        var sql = ` SELECT 
                        *
                    FROM 
                        users;
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

    logIn: function (email, password, callback) {
        var conn = db;

        var sql = ` SELECT 
                            * 
                        FROM 
                            users
                        WHERE 
                            email=? AND
                            password=?
                    `;

        conn.query(sql, [email, password], (error, results) => {

            if (error) {
                callback(error, null);
                return;
            }

            if (results.length === 0) {
                return callback(null, null);

            }
            else {
                const user = results[0];
                return callback(null, user);
            }
        });
    },

    signUp: function (email, password, full_name, callback) {
        var conn = db;

        var sql = `
        INSERT INTO
        users
        (email, password, full_name)
        VALUES 
        (?, ?, ?);
        `;
        conn.query(sql, [email, password, full_name], function (err, result) {
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
module.exports = userDB;
