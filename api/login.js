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
                let hash = user.password_hash;
                let password = req.body.password;
                bcrypt.compare(password, hash).then((result) => {
                    if (result) {
                        const token = jwt.sign({email: req.body.email}, config.token_key);
                        connection.query(`UPDATE weather.users SET token = '${token}' WHERE email = '${req.body.email}'`, () => {});
                        res.status(200).json({
                            msg: 'Login successful',
                            email: req.body.email,
                            token: token
                        });
                    } else {
                        res.status(500).json('Incorrect email or password');
                    }
                });
            } else {
                res.status(500).json('Incorrect email or password');
            }
        }
    });
});

module.exports = router;
