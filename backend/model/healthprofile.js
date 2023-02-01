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
var hpDB = {

    getAllHPGeneral: function (userid, callback) {
        var conn = db;

        var sql = ` SELECT 
                        HP_General.*, users.full_name, DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(),HP_General.DATE_OF_BIRTH)), '%Y') 
                        + 0 AS age, DATE_FORMAT(HP_General.DATE_OF_BIRTH, '%d %b %Y') AS dob
                    FROM 
                        HP_General 
                    INNER JOIN
                        users 
                    ON 
                        HP_General.userid = users.id
                    WHERE
                        HP_General.userid = ?;
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

    getAllHPMedical: function (userid, callback) {
        var conn = db;

        var sql = ` SELECT 
                        *
                    FROM 
                        HP_Medical
                    WHERE
                        userid = ?;
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

    getAllHPMedication: function (userid, callback) {
        var conn = db;

        var sql = ` SELECT 
                        *
                    FROM 
                        HP_Medication
                    WHERE
                        userid = ?;
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

    getAllHPSurgical: function (userid, callback) {
        var conn = db;

        var sql = ` SELECT 
                        *
                    FROM 
                        HP_Surgical
                    WHERE
                        userid = ?;
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

    getAllHPDrug: function (userid, callback) {
        var conn = db;

        var sql = ` SELECT 
                        *
                    FROM 
                        HP_Drug
                    WHERE
                        userid = ?;
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

    getAllHPVaccination: function (userid, callback) {
        var conn = db;

        var sql = ` SELECT 
                        *
                    FROM 
                        HP_Vaccination
                    WHERE
                        userid = ?;
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

    insertHPGeneral: function (userid, gender, date_of_birth, blood_type, weight, height, callback) {
        var conn = db;

        var sql = `
        INSERT INTO HP_General 
        	(userid, gender, date_of_birth, blood_type, weight, height)
        VALUES
        	(?, ?, ?, ?, ?, ?)
        `

        conn.query(sql, [userid, gender, blood_type, date_of_birth, weight, height], function (err, result) {

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

    insertHPMedical: function (userid, text, callback) {
        var conn = db;

        var sql = `
        INSERT INTO HP_Medical 
        	(userid, text)
        VALUES
        	(?, ?)
        `

        conn.query(sql, [userid, text], function (err, result) {

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

    insertHPMedication: function (userid, text, callback) {
        var conn = db;

        var sql = `
        INSERT INTO HP_Medication 
        	(userid, text)
        VALUES
        	(?, ?)
        `

        conn.query(sql, [userid, text], function (err, result) {

            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
    },

    deleteHPMedication: function (id, callback) {
        var conn = db;

        var sql = `
        DELETE FROM HP_Medication
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

    insertHPSurgical: function (userid, text, callback) {
        var conn = db;

        var sql = `
        INSERT INTO HP_Surgical 
        	(userid, text)
        VALUES
        	(?, ?)
        `

        conn.query(sql, [userid, text], function (err, result) {

            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
    },

    deleteHPSurgical: function (id, callback) {
        var conn = db;

        var sql = `
        DELETE FROM HP_Surgical
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

    insertHPDrug: function (userid, text, callback) {
        var conn = db;

        var sql = `
        INSERT INTO HP_Drug 
        	(userid, text)
        VALUES
        	(?, ?)
        `

        conn.query(sql, [userid, text], function (err, result) {

            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
    },

    deleteHPDrug: function (id, callback) {
        var conn = db;

        var sql = `
        DELETE FROM HP_Drug
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

    insertHPVaccination: function (userid, text, callback) {
        var conn = db;

        var sql = `
        INSERT INTO HP_Vaccination 
        	(userid, text)
        VALUES
        	(?, ?)
        `

        conn.query(sql, [userid, text], function (err, result) {

            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
    },

    deleteHPVaccination: function (id, callback) {
        var conn = db;

        var sql = `
        DELETE FROM HP_Vaccination
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
    }
}

//-----------------------------------------
// exports
//-----------------------------------------
module.exports = hpDB;
