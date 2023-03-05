const express = require('express');
const bcrypt = require('bcrypt');
const connection = require('../db');

const router = express.Router();
const body_parser = require('body-parser');

router.post('/', body_parser.urlencoded({ extended: false }), (req, res) => {

    // bcrypt.hash('Letmein1!', 10, (err, hash) => {
    //     console.log(hash);
    //     bcrypt.compare('Letmein1!', '$2b$10$gK4fu5GcNhJn.LM0I8bPL.55i4nvOYwn02LC3ZhfUAAPGsHjfji3u', (compare_err, result) => {
    //         console.log(result);
    //     });
    // });
    console.log(req.body);

    let query = 'select * from users where email = \'' + req.body.email + '\'';
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
            let user = rows[0];
            let hash = user.password_hash;
            let password = req.body.password;
            bcrypt.compare(password, hash).then((result) => {
                if (result) {
                    res.status(400).json('Login successful');
                } else {
                    res.status(500).json('Incorrect email or password');
                }
            });
        }
    });
});

module.exports = router;
