const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'dbap',
    password: '1234',
    database: 'login'
});

module.exports = connection;