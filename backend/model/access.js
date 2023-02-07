console.log("----------------------------");
console.log("vitals.js");
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
var accessDB = {

    getAllSelectedDoctor: function (patientid,callback) {
        var conn = db;

        var sql = ` /* Finding Selected Doctor */
        SELECT 
            pd.patientid,pd.doctorid,u.id, u.type, u.full_name
        FROM
            users u , patient_doctor_access pd
        WHERE
            u.id = pd.doctorid AND pd.patientid = ?;
                `;

        conn.query(sql,[patientid], function (err, result) {

            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
    },

    getNotSelectedDoctor: function (patientid,callback) {
        var conn = db;

        var sql = `/*finding non Selected Doctor */
        SELECT 
            u.id, u.type, u.full_name
        FROM
            users u
        WHERE NOT EXISTS
        (SELECT 
            *
        FROM
            patient_doctor_access pd
        Where 
            pd.doctorid = u.id and pd.patientid = ?) AND u.type ="doctor";
                `;

        conn.query(sql,[patientid], function (err, result) {

            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
    },

    getSelectedPatient: function (doctorid,callback) {
        var conn = db;

        var sql = `/* Finding Selected Patient */
        SELECT 
            pd.patientid,pd.doctorid,u.id, u.type, u.full_name
        FROM
            users u , patient_doctor_access pd
        WHERE
            u.id = pd.patientid AND pd.doctorid = ?;
                `;

        conn.query(sql,[doctorid], function (err, result) {

            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
    },

    deleteSelectedDoctor: function (patientid,doctorid,callback) {
        var conn = db;

        var sql = `
        DELETE FROM 
            patient_doctor_access 
        WHERE 
            patientid = ? and doctorid = ?;
                `;

        conn.query(sql,[patientid,doctorid], function (err, result) {

            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
    },

    addSelectedDoctor: function (patientid,doctorid,callback) {
        var conn = db;

        var sql = `
        INSERT INTO
            patient_doctor_access(patientid, doctorid)
        VALUE
        (?, ?);
                `;

        conn.query(sql,[patientid,doctorid], function (err, result) {

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
module.exports = accessDB;
