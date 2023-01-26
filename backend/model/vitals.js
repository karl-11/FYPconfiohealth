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
var vitalsDB = {

    getAllvitals: function (callback) {
        var conn = db;

        var sql = ` SELECT 
                        * 
                    FROM 
                        vitalsigns
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

    getSelectedvitals: function (userid, callback) {
        var conn = db;

        var sql = ` 
            SELECT 
                * 
            from 
                vitalsSelected 
            WHERE 
                userid = ?
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

    getNotSelectedvitals: function (userid, callback) {
        var conn = db;

        var sql = ` 
        SELECT 
            id, vital_sign_type,vital_sign_img 
        From 
            vitalsigns v 
        WHERE NOT EXISTS 
            (Select 
                * 
            from 
                vitalsSelected vs 
            WHERE 
                v.id = vs.vitalsid AND vs.userid = ?);
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

    addSelectedVitals: function (userid, vitalid, callback) {
        var conn = db;

        var sql = ` 
        INSERT INTO 
            vitalsSelected (userid, vitalsid, selectedVitals,vital_sign_img)
        SELECT 
            ?,id,vital_sign_type,vital_sign_img from vitalsigns v
        WHERE 
            v.id = ? ;
                `;

        conn.query(sql, [userid, vitalid], function (err, result) {

            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
    },


    removeSelectedVitals: function (userid, vitalid, callback) {
        var conn = db;

        var sql = ` 
        DELETE FROM 
            vitalsSelected 
        WHERE 
            userid = ? and vitalsid = ?;
                `;

        conn.query(sql, [userid, vitalid], function (err, result) {

            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
    },

    getVitalsValue: function (userid, vitalid, callback) {
        var conn = db;

        var sql = ` 
        SELECT 
            vv.vitalid, vv.userid, vv.datetimecreated, vs.vital_sign_type, vs.vital_value, vv.vitalvalue
        from 
            Vital_Signs_value vv, vitalsigns vs
        Where 
            userid = ? and vitalid = ? and vitalid = vs.id
        Order by 
            datetimecreated asc;
                `;

        conn.query(sql, [userid, vitalid], function (err, result) {

            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
    },

    addVitalValue: function (userid, vitalid, vitalvalue, datetimecreated, callback) {
        var conn = db;

        var sql = ` 
        INSERT INTO
	        Vital_Signs_value(userid, vitalid, vitalvalue,datetimecreated)
        VALUE
	        (?,?,?,?);
                `;

        conn.query(sql, [userid, vitalid, vitalvalue, datetimecreated], function (err, result) {

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
module.exports = vitalsDB;
