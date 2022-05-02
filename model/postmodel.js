const mongoose=require("mongoose");

let CommentSchema=new mongoose.Schema({
    user:String,
    cmt:String
})

let postschema=new mongoose.Schema({

    creator:String,
    name:String,
    title:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    tags:[String],
    image:String,
    selectedFile:String,
    likes:{
        type:[String],
        default:[]
    },
    date:{
        type:Date,
        default:new Date()
    },
    Comment:[{
        user:String,
        cmt:String
    }]
})

module.exports=mongoose.model("Post",postschema);