const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

dotenv.config({ path: './.env' });

const app = express();
const connection = require('./db/connection');
const routers = require('./routers/routes');

connection.connect( (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("MYSQL Connected...");
    }
})

app.use(cors());
// app.use(express.json());
app.use(express.json({ extended: false }));
app.use("/api",routers);
// app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());

app.listen(5001, () => {
    console.log("Server start at port 5001");
});