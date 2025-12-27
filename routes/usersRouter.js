const express = require('express')
const router = express.Router()
const cookieParser = require('cookie-parser')
const {registerUser} = require('../controllers/authController')
const{loginUser} = require("../controllers/userLogin")
const {isLoggin} = require('../middlewares/isLoggin')
router.use(cookieParser())

router.get('/', (req, res) =>{
    res.send("its working user")
})

router.post('/register',registerUser)

router.post('/login',loginUser)

router.post('/logout',(req,res)=>{
    res.cookie('token','');
    res.redirect('/')
})

router.get('/shop',isLoggin,(req,res)=>{
    res.render('shop')
})
module.exports = router;
