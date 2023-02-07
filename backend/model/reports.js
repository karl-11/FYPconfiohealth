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

    // model function to insert a new report file into the database
    uploadFile: function (folder_id, file_name, file_type, userid, display_name, file_size, callback) {
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
                var msg = display_name + "." + file_name.split(".")[1] + "  already exists. Please enter a different name."

                var output = {
                    success: 'no',
                    errCode : "file already exists",
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
                        var msg = display_name + "." + file_name.split(".")[1] + " is uploaded successfully";

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

    // end point to add new folder
    insertFolder: function (folderName, userid, callback) {
        var conn = db;

        var sql = `
                    insert into 
	                Report_Folders
	                    (folder_name, userid)
                    values
	                    (?, ?)
        `

        conn.query(sql, [folderName, userid], function (err, result) {

            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
    },

    // model function to get all folders for a user
    getFoldersForUser: function (userid, callback) {
        var conn = db;

        var sql = `
        SELECT 
            *
        FROM
            Report_Folders
        WHERE 
            userid = ?
        `

        conn.query(sql, [userid], function (err, result) {

            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
    },

    // end point to delete a folder
    deleteFolder: function (id, callback) {
        var conn = db;

        var sql = `
        DELETE FROM Report_Folders
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

    // end point to get all files in a folder for a user
    getFilesInsideFolder: function (folderid, callback) {
        var conn = db;

        var sql = `
            SELECT 
                * 
            FROM 
                Report
            WHERE
                folderid = ?
        `

        conn.query(sql, [folderid], function (err, result) {

            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
    },

    // end point to get one file to view in detail
    getFile: function (file_id, callback) {
        var conn = db;

        var sql = `
            SELECT 
                * 
            FROM 
                Report
            WHERE
                id = ?
        `

        conn.query(sql, [file_id], function (err, result) {

            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
    },

    // end point to delete uploaded file
    deleteFile: function (file_id, callback) {
        var conn = db;

        var sql = `
                DELETE FROM Report WHERE id = ?
            `

        conn.query(sql, [file_id], function (err, result) {

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
module.exports = uploadDB;
