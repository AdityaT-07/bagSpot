const bcrypt =  require('bcrypt');
const userModel = require('../models/userModel');
const { generateToken } = require('../utils/generateToken');

module.exports.loginUser = async (req,res)=>{
let {email,password} = req.body;
let existinguser =  await userModel.findOne({email});
if(existinguser){
bcrypt.compare(password,existinguser.password,(err,result)=>{
    if(result){
        let token = generateToken(existinguser);
        res.cookie("token",token)
        res.send("loginned successfully")

    }
    else{
        res.status(500).send("incorrect username or password!!")
    }
})
}
}