const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser')
const db = require("./config/mongooseConnection.js")
const usersRouters = require("./routes/usersRouter.js")
const ownersRouters = require("./routes/ownersRouters.js")
const productsRouters = require("./routes/productsRouters.js")
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs')
app.use(cookieParser())


//separate routes
app.use('/users',usersRouters)
app.use('/owners',ownersRouters)
app.use('/products',productsRouters)

app.get('/',(req,res)=>{
    res.render('register')
})


app.listen(3000);