const express = require('express')
const router = express.Router()
const cookieParser = require('cookie-parser')
const {registerUser} = require('../controllers/authController')
const{loginUser} = require("../controllers/userLogin")
const {isLoggin} = require('../middlewares/isLoggin')
const productModel = require('../models/productModel');
const Cart = require('../models/cartModel');

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

router.post('/cart/add', async (req, res) => {
  try {
    const { productId } = req.body;
    const productdata = await productModel.findOne({_id : productId})
    const userId = req.session.user._id; // comes from login

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [{ productId, quantity: 1 }]
      });
    } else {
      const index = cart.items.findIndex(
        item => item.productId.toString() === productId
      );

      if (index > -1) {
        cart.items[index].quantity += 1;
      } else {
        cart.items.push({ productId });
      }

      await cart.save();
    }

    res.render('cart',{productdata});

  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to add to cart');
  }
});



module.exports = router;
