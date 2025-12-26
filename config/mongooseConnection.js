const mongoose = require('mongoose');
const dbgr= require('debug')("development:mongoose")

mongoose.connect(`mongodb://localhost:27017/bagspotdb`).then(()=>{
    dbgr("database connected...");
    
}).catch((err)=>{
    dbgr("Error : ",err);
    
})

module.exports = mongoose.connection;