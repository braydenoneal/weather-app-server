const express = require('express');

const app = express();
const port = 3000;
const hostname = '127.0.0.1';

const router = express.Router();
router.use(express.json());

const api = require('./api/login');

router.use('/api/login', api);
app.use(router);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
