const express = require('express')
const router = express.Router()
const cookieParser = require('cookie-parser')
const {registerUser} = require('../controllers/authController')
const{loginUser} = require("../controllers/userLogin")

router.use(cookieParser())

router.get('/', (req, res) =>{
    res.send("its working user")
})

router.post('/register',registerUser)

router.post('/login',loginUser)


module.exports = router;
