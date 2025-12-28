const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ownerValidationSchema = require('../validation/ownerValidator')
const ownermodel = require('../models/ownerModel')
if(process.env.NODE_ENV ==='development'){
  router.get('/',(req,res)=>{
    res.render('ownerRegister')
  })
    router.post('/create', async (req,res)=>{
             let owners = await ownermodel.find();
             if(owners.length >0){
              res.redirect('/')
               return res
                .status(502)
                .send("you dont have permission to create a new owner")
                
             }
             let {error,value} = ownerValidationSchema.validate(req.body);
             if(error){
              return res
                .status(502)
                .send("please fill all details")
             }
             
            const hash = await bcrypt.hash(value.password, 10)
             
             
             let createdOwner = await ownermodel.create({
                    fullName :value.fullName,
                    email : value.email ,
                    password : hash
             })
             
             res.status(201).send(createdOwner)
    })

    router.get('/login', (req, res) =>{
  res.render('ownerLogin')
})
router.post('/loginCheck',async(req,res)=>{
try {
  const { email, password } = req.body;

  
  const owner = await ownermodel.findOne({ email });

  if (!owner) {
    return res.send('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, owner.password);

  if (isMatch) {
    res.render('createproducts');
  } else {
    res.send('Invalid email or password');
    
    
  }

} catch (err) {
  console.error(err);
  res.status(500).send('Server error');
}

            
})
}





module.exports = router;
