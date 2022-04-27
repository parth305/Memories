const mongoose=require("mongoose");

let postschema=new mongoose.Schema({

    creator:String,
    title:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    tags:String,
    image:String,
    selectedFile:String,
    likes:{
        type:[String],
        default:[]
    },
    date:{
        type:Date,
        default:new Date()
    }
})

module.exports=mongoose.model("Post",postschema);