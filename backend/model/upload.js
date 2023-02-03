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
var uploadDB = {

    uploadImage: function (folder_id, file_name, file_type, userid, display_name, file_size, callback) {
        var conn = db;

        var sql = ` SELECT 
                        * 
                    FROM 
                        Report 
                    WHERE 
                        display_name = ? 
                        AND folderid = ? 
                        AND userid = ?
                `;

        conn.query(sql, [display_name, folder_id, userid], function (err, result) {

            if (err) {
                console.log(err);
                return callback(err, null);
            }
            if (result.length >= 1) {
                var msg = display_name +"."+ file_name.split(".")[1] + "  already exists. Please enter a different name."

                var output = {
                    success: 'no',
                    msg: msg
                }
                return callback(null, output);
            }
            else {
                var sql = ` INSERT INTO 
                                Report 
                            SET folderid = ?, 
                                file_name = ?, 
                                file_type = ?,
                                userid = ?,
                                display_name = ?,
                                file_size = ?,
                                upload_date = NOW();
                            `

                conn.query(sql, [folder_id, file_name, file_type, userid, display_name, file_size], function (err, result) {

                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        var msg = display_name +"."+ file_name.split(".")[1] + " is uploaded successfully";

                        var output = {
                            success: 'yes',
                            msg: msg,
                            insertedID: result.insertedID
                        }
                        return callback(null, output);
                    }
                });
            }
        });
    },

    insertHPGeneral: function (userid, gender, date_of_birth, blood_type, weight, height, callback) {
        var conn = db;

        var sql = `
        INSERT INTO HP_General 
        	(userid, gender, date_of_birth, blood_type, weight, height)
        VALUES
        	(?, ?, ?, ?, ?, ?)
        `

        conn.query(sql, [userid, gender, date_of_birth, blood_type, weight, height], function (err, result) {

            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
    },

    updateHPGeneral: function (weight, height, userid, callback) {
        var conn = db;

        var sql = `
        UPDATE HP_General 
        	SET weight = ?, height = ?
        WHERE
            userid = ?
        `

        conn.query(sql, [weight, height, userid], function (err, result) {

            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
    },

    deleteHPMedical: function (id, callback) {
        var conn = db;

        var sql = `
        DELETE FROM HP_Medical
        WHERE
             id = ?
        `

        conn.query(sql, [id], function (err, result) {

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
module.exports = uploadDB;
