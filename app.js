const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const dotenv = require('dotenv');

const routers = require('./routers/routes');

dotenv.config({
    path: './.env'
});

const app = express();
const conn = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

conn.connect( (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("MYSQL Connected...");
    }
})

app.use(cors());
app.use(express.json());
app.use(routers);
app.listen(5001, () => {
    console.log("Server start at port 5001");
});