const mysql = require ('mysql');
const config = require('./config');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'fyp-confio-health.chhhzwpttcar.us-east-1.rds.amazonaws.com',
    user: config.databaseUserName,
    password: config.databasePassword,
    database: config.databaseName,
    multipleStatements: true
});

module.exports=pool;