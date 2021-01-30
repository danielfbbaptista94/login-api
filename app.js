const express = require('express');
const cors = require('cors');

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
app.use(express.json());
app.use(routers);
app.listen(5001, () => {
    console.log("Server start at port 5001");
});