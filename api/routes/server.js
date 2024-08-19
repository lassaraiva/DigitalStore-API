const express = require('express');
const {cors, bodyParser } = require('../middleware/middleware')
const status = require('../controllers/appControlller')
const app = express();  

app.use(bodyParser.json());
app.use(cors())

app.get('/', status);

module.exports = app