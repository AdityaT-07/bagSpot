const express = require('express')
const router = express.Router()
const ownerValidationSchema = require('../validation/ownerValidator')
const ownermodel = require('../models/ownerModel')
if(process.env.NODE_ENV ==='development'){
    router.post('/create', async (req,res)=>{
             let owners = await ownermodel.find();
             if(owners.length >0){
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
             let createdOwner = await ownermodel.create({
                    fullName :value.fullName,
                    email : value.email ,
                    password : value.password
             })
             res.status(201).send(createdOwner)
    })
}



router.get('/', (req, res) =>{
  res.send("on owner route")
})



module.exports = router;
