import mongoose from "mongoose";

const userSchmema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String,
        default:""
    },
    clerkID:{
        type:String,
        required:true,
        unique:true
    }
})

const User = mongoose.model("User", userSchmema)
export default User;