/*
Connects the api to the mysql server on the host machine.
 */
const mysql = require('mysql');
const config = require('./configuration/config.json');

const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

module.exports = connection;
