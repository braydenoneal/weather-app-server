const express = require('express');

const app = express();
const port = 3000;
const hostname = '127.0.0.1';

const body_parser = require('body-parser');
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

const router = express.Router();
router.use(express.json());

const api_login = require('./api/login');
const api_authenticate = require('./api/authenticate');

router.use('/api/login', api_login);
router.use('/api/authenticate', api_authenticate);
app.use(router);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
