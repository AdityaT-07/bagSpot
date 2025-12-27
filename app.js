const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser')
const db = require("./config/mongooseConnection.js")
const indexRouter = require("./routes/index.js")
const usersRouters = require("./routes/usersRouter.js")
const ownersRouters = require("./routes/ownersRouters.js")
const productsRouters = require("./routes/productsRouters.js")
const flash = require('connect-flash');
const expressSession = require('express-session')

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs')
app.use(cookieParser())
app.use(expressSession({
    resave : false,
    saveUninitialized : false,
    secret : process.env.EXPRESS_SESSION_SECRET
}))
app.use(flash())

//separate routes
app.use('/',indexRouter)
app.use('/users',usersRouters)
app.use('/owners',ownersRouters)
app.use('/products',productsRouters)

// app.get('/',(req,res)=>{
//     let error = req.flash("error");
//     res.render('index',{error})
// })




app.listen(3000);