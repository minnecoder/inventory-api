const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const routes = require('../routes')

function createServer() {
    const app = express();

    app.use(cors({ origin: "*" }));
    app.use(bodyParser.json());
    app.use(cookieParser())
    app.use(routes)
    return app
}

module.exports = createServer