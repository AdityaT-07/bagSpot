const express = require('express')
const router = express.Router()
const cookieParser = require('cookie-parser')
const {registerUser} = require('../controllers/authController')
const{loginUser} = require("../controllers/userLogin")
const {isLoggin} = require('../middlewares/isLoggin')
const productModel = require('../models/productModel');

router.use(cookieParser())

router.get('/', (req, res) =>{
    res.send("its working user")
})

router.post('/register',registerUser)

router.post('/login',loginUser)

router.get('/logout',(req,res)=>{
    res.cookie('token','');
    res.redirect('/')
})

router.get('/shop',isLoggin, async (req,res)=>{
      try {
    const products = await productModel.find()
    res.render('shop', { products })
  } catch (err) {
    res.status(500).send('Something went wrong')
  }
    
    // res.render('shop')
})

module.exports = router;
