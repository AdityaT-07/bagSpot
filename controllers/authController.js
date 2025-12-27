const bcrypt = require('bcrypt');
const userValidationSchema = require('../validation/userValidator')
const userModel = require('../models/userModel')
const {generateToken} = require("../utils/generateToken")


module.exports.registerUser =  async (req, res) =>{
    try{
    let {error,value} = userValidationSchema.validate(req.body)
       if(error){
              return res
                .status(502)
                .send("please fill all details")
             }
             let {email,password,fullname} = value;
     let searchUser =  await userModel.find({email});
     if(searchUser){
         return res.status(401).send("oops! account already exist")
     }

    bcrypt.genSalt(10,  (err,salt)=>{
         bcrypt.hash(password,salt, async (err,hash)=>{
            if(err){
                return res.send(err.message);
            } 
            else{
              let user =  await userModel.create({
                  email ,
                  password : hash,
                  fullname
                })
                
               let token = generateToken(user);
               res.cookie('token',token)
            }
          })
       })   
}
catch(err){
    res.send(err.message);
    
}
}