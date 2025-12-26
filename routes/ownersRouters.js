const express = require('express')
const app = express.Router()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

module.exports = app;
