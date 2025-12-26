import mongoose, { connect } from "mongoose";

connect(`mongodb://localhost:27017/bagspotdb`).then(()=>{
    console.log("database connected...");
    
}).catch((err)=>{
    console.log("Error : ",err);
    
})

export default mongoose.connection