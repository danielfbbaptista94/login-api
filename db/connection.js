const mysql = require('mysql2');
// const dotenv = require('dotenv');

// dotenv.config({ path: './.env' });

const connection = mysql.createConnection({
    database: process.env.DATABASE,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
});

module.exports = connection;