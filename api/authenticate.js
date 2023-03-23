/*
Api route for checking authentication with a token from the user.
 */
const express = require('express');
const connection = require('../db');

const router = express.Router();
const body_parser = require('body-parser');

router.post('/', body_parser.urlencoded({ extended: false }), (req, res) => {
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
                // check if user's token matches their token on the server
                if (user.token === req.body.token) {
                    res.status(200).json('Authenticate successful');
                } else {
                    res.status(500).json('Invalid token');
                }
            } else {  // user with token's email does not exist
                res.status(500).json('User does not exist');
            }
        }
    });
});

module.exports = router;
