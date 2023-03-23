/*
Api route for getting a username and password and returning a token.
 */
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../db');
const config = require('../configuration/config.json');

const router = express.Router();
const body_parser = require('body-parser');

router.post('/', body_parser.urlencoded({ extended: false }), (req, res) => {
    // get all users
    let query = 'select * from users';
    connection.query(query, (err, rows) => {
        if (err) {  // server error
            res.status(500).json({
                error: err
            });
        } else if (!rows) {  // no users in server
            res.status(400).json({
                msg: 'No users found'
            });
        } else {
            // find first user that matches email from the api request
            const user = rows.find((row) => row.email === req.body.email);
            if (user) {
                let hash = user.password_hash;
                let password = req.body.password;
                // check password from request with the hash on the server
                bcrypt.compare(password, hash).then((result) => {
                    if (result) {
                        // create token and send to user
                        const token = jwt.sign({email: req.body.email}, config.token_key);
                        connection.query(`UPDATE weather.users SET token = '${token}' WHERE email = '${req.body.email}'`, () => {});
                        res.status(200).json({
                            msg: 'Login successful',
                            email: req.body.email,
                            token: token
                        });
                    } else {  // incorrect password
                        res.status(500).json('Incorrect email or password');
                    }
                });
            } else {  // incorrect email
                res.status(500).json('Incorrect email or password');
            }
        }
    });
});

module.exports = router;
