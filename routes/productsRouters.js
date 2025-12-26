const express = require('express')
const router = express.Router()
const port = 3000

router.get('/', (req, res) => res.send('Hello World!'))

module.exports = router;
