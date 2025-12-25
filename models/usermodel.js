import { connect, Schema, model } from 'mongoose';

connect(`mongodb://localhost:27017/bagspotdb`);

const userSchema = Schema({
    fulname : String,
    email : String,
    password : String,
    cart : {
        type : Array,
        default : []
    },
    isAdmin : Boolean,
    orders : {
        type : Array,
        default : []
    },
    contact : Number,
    picture : String
    

})

export default model('user',userSchema);