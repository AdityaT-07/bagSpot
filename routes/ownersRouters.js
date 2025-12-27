const express = require('express')
const router = express.Router()
const Joi = require('joe');
const ownermodel = require('./models/ownerModel.js')
if(process.env.NODE_ENV ==='development'){
    router.post('/create', async (req,res)=>{
             let owners = await ownermodel.find();
             if(owners.length >0){
               return res
                .status(502)
                .send("you dont have permission to create a new owner")
             }
             let{fullName,email,password,picture} = req.body;
             let createdOwner = await ownermodel.create({
                    fullName : Joi.toString().min(3).trim().required(),
                    email : Joi.toString().email().required(),
                    password : Joi.toString().min(6).required()
             })
             res.status(201).send(createdOwner)
    })
}



router.get('/', (req, res) =>{
  res.send("on owner route")
})



module.exports = router;
