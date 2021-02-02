const connection = require('../db/connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// const dotenv = require('dotenv');

// dotenv.config({ path: './.env' });

module.exports = {
    async create(req, res) {
        const { name, email, username, password } = req.body;
        
        connection.query("SELECT username FROM users WHERE username = ?", [username], 
            async (error, result) => {
                if (error)
                    console.log(error);
                
                if (result.length > 0) 
                    return res.json("Username is already in use !")
                
                console.log(password);
                var hashPassword = await bcrypt.hash(password, 8);
                console.log(hashPassword);
                
                connection.query("INSERT INTO users SET ?", 
                    { name: name, email: email, username: username, password: hashPassword }, 
                    (error, result) => {
                        if (error)
                            console.log(error);
                        else 
                            return res.json("OK");
                    }
                );
            }

        );
    },

    async login(req, res) {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json("Username or Password is empty !");
            }

            connection.query("SELECT * FROM users WHERE username = ?", [username], 
                async (error, result) => {
                    console.log(result);
                    if (error)
                        console.log(error);
                    
                    if (!result || !(await bcrypt.compare(password, result[0].password))) {
                        return res.status(401).json("Username or Password is incorrect !");
                    } else {
                        const id = result[0].id
                        const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
                            expiresIn: process.env.JWT_EXPIRES_IN
                        })

                        console.log("The Token is: " + token);

                        const cookieOptions = {
                            expires: new Date(
                                Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                            ),
                            httpOnly: true
                        }

                        res.cookie('jwt', token, cookieOptions);
                        res.status(200).json({msg: "Login Successful"});
                    }
                }
            );

        } catch (error) {
            console.log("LOGIN ERROR: "+error);
        }
    }
};

