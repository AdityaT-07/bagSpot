const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/productModel');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + '-' + Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  }
});


const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Only images allowed'), false);
  }
};


const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});


router.post('/create', upload.single('image'), async (req, res) => {
  try {
    const {
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor
    } = req.body;

    if (!req.file) {
      return res.status(400).send('Image is required');
    }

    const product = await Product.create({
      image: req.file.filename,   // stored in DB
      name,
      price,
      discount,
      bgColor: bgcolor,
      panelColor: panelcolor,
      textColor: textcolor
    });

    res.status(201).json({
      message: 'Product created successfully',
      product
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});



module.exports = router;
