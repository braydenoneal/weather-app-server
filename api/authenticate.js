const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../db');
const config = require('../configuration/config.json');

const router = express.Router();
const body_parser = require('body-parser');

router.post('/', body_parser.urlencoded({ extended: false }), (req, res) => {
    let query = 'select * from users';
    connection.query(query, (err, rows) => {
        if (err) {
            res.status(500).json({
                error: err
            });
        } else if (!rows) {
            res.status(400).json({
                msg: 'No users found'
            });
        } else {
            const user = rows.find((row) => row.email === req.body.email);
            if (user) {
                if (user.token === req.body.token) {
                    res.status(200).json('Authenticate successful');
                } else {
                    res.status(500).json('Invalid token');
                }
            } else {
                res.status(500).json('User does not exist');
            }
        }
    });
});

module.exports = router;
