const express = require('express');
const connection = require('../db');

const router = express.Router();

router.post('/', (req, res) => {
    // res.status(200).json({
    //     msq: 'Success...'
    // });
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
            let users = [];
            rows.forEach((row) => {
                let user = {
                    email: row.email,
                    last_name: row.last_name,
                    first_name: row.first_name,
                    date_created: row.date_created,
                    last_login: row.last_login
                }
                users.push(user);
            });
            res.status(400).json(users);
        }
    });
});

module.exports = router;
