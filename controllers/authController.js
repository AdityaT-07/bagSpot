const bcrypt = require('bcrypt');
const userValidationSchema = require('../validation/userValidator');
const userModel = require('../models/userModel');
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    console.log(req.body);
    
    const { error, value } = userValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const { email, password, fullName } = value;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(401).send("oops! account already exist");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      email,
      password: hash,
      fullName
    });

    const token = generateToken(user);
    res.cookie('token', token);
    res.status(201).send("User registered successfully");

  } catch (err) {
    res.status(500).send(err.message);
  }
};
