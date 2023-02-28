// db.js

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'weather-dev',
    password: 'weatherdev',
    database: 'weather'
});

module.exports = connection;
