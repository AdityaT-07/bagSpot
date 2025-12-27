const mongoose = require('mongoose');
const dbgr= require('debug')("development:mongoose")
const config = require('config')

mongoose.connect(`${config.get("MONGODB_URI")}/bagspotdb`).then(()=>{
    dbgr("connected...");
    
}).catch((err)=>{
    dbgr("Error : ",err);
    
})

module.exports = mongoose.connection;