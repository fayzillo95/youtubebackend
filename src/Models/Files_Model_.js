import {Schema,model} from "mongoose"

import User_Model_ from "./User_Model_.js"

export default new model("File", new Schema({
    title:{
        type:String, 
        default : "title"
    },
    size : {
        type:Number,
        required:true
    },
    user_id : {
        type : Schema.Types.ObjectId,
        ref: "User"
    },
    file_name :{
        type:String,
        required:true
    }
}));