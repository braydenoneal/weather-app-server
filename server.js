const express = require('express');

const app = express();
const port = 3000;
const hostname = '127.0.0.1';

const body_parser = require('body-parser');
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

const router = express.Router();
router.use(express.json());

const api = require('./api/login');

router.use('/api/login', api);
app.use(router);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
