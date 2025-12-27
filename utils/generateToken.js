const jwt = require('jsonwebtoken')

const generateToken = (user)=>{
    return   jwt.sign({email : user.email, id : user.__id},process.env.JWT_KEY)
}
module.exports.generateToken = generateToken;