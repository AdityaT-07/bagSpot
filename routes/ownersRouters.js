const express = require('express')
const router = express.Router()
const ownermodel = require('./models/ownerModel.js')
if(process.env.NODE_ENV ==='development'){
    router.post('/create', async (req,res)=>{
             let owners = await ownermodel.find();
            
             let{fullName,email,password,picture} = req.body;
             let createdOwner = await ownermodel.create({
                    fullName,
                    email,
                    password
             })
             res.status(201).send(createdOwner)
    })
}



router.get('/', (req, res) =>{
  res.send("on owner route")
})



module.exports = router;
