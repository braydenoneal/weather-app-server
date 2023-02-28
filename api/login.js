const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
    res.status(200).json({
        msq: 'Success...'
    });
});

module.exports = router;
