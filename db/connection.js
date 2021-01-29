const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'dbap',
    password: '1234',
    database: 'login'
});

// const connection = new pg.Client({
//     host: process.env.DATABASE_HOST,
//     database: process.env.DATABASE,
//     port: process.env.DATABASE_PORT,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
// });


module.exports = connection;