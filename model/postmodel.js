const mongoose=require("mongoose");

let postschema=new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tags:[String],
    image:String,
    likecount:{
        type:String,
        default:0
    },
    date:{
        type:Date,
        default:new Date()
    }
})

module.exports=mongoose.model("Post",postschema);