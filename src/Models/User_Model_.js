import {Schema, model } from "mongoose"

const User_Model_  = model("User",Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password :{
        type:String,
        required:true
    },
    profile_img:{
        type:String,
        required:true
    },
    tokenVersion:{
        type:Number,
        default:0
    }
}))

export default User_Model_