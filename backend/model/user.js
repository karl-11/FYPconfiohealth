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
                            email=? 
                    `;

        conn.query(sql, [email], (error, results) => {

            if (error) {
                callback(error, null);
                return;
            }

            if (results.length === 0) {
                return callback(null, null);

            }
            else {

                console.log(results);

                if (bcrypt.compareSync(password, results[0].password) == true) {

                    let data = {
                        user_id: results[0].id,
                        role_name: results[0].type,
                        token: jwt.sign({ id: results[0].id }, jwtconfig, {
                            expiresIn: 86400 //Expires in 24 hrs
                        })
                    }; //End of data variable setup

                    //return res.status(200).json(data);
                    const user = results[0];
                    return callback(null, user);
                } else {
                    // return res.status(500).json({ message: 'Login has failed.' });
                    return res.status(500).json({ message: error });
                }



            }
        });
    },

    signUp: function (email, password, full_name, callback) {
        var conn = db;

        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                console.log('Error on hashing password');
                return res.status(500).json({ statusMessage: 'Unable to complete registration' });
            } else {
                var sql = `
                INSERT INTO
                users
                (email, password, full_name)
                VALUES 
                (?, ?, ?);
                `;
                conn.query(sql, [email, hash, full_name], function (err, result) {
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
module.exports = userDB;
