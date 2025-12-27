const express = require('express')
const router = express.Router()
const cookieParser = require('cookie-parser')
const {registerUser} = require('../controllers/authController')

router.use(cookieParser())

router.get('/', (req, res) =>{
    res.send("its working user")
})

router.get('/register',registerUser)


module.exports = router;
