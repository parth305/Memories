const { validationResult } = require("express-validator");
const { default: mongoose } = require("mongoose");

const Post = require("../model/postmodel");
let getpost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            error: errors.array()[0]
        });
    }
    try{
    let post=await Post.find(req.body);
    return res.status(200).json({success:true,data:post});
    }
    catch(error){
        res.status(401).json({success:false,msg:error.message});
    }
}

let addpost = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            error: errors.array()[0]
        });
    }
    try{
        // let post=req.body;
        let newpost=req.body
        console.log(newpost);
        let savedpost=new Post(newpost);
        await savedpost.save()
        res.status(200).json({success:true,msg:"post added",data:newpost})
    }catch(error){
        console.log("gheye");
        res.status(500).json({success:false,msg:error.message})
    }
}

let updatepost=async (req,res)=>{
    let {id:_id}=req.params;

    let post=req.body
    try{
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({success:false,data:"No post found"});

    let updatedpost=await Post.findByIdAndUpdate(_id,post,{new:true});
    res.status(200).json({success:true,data:updatedpost});
    }
    catch(error){
        res.status(500).json({success:false,data:"internal server error"})
    }
}
let deletepost=async (req,res)=>{
    let {id:_id}=req.params;
    try{
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({success:false,data:"No post found"});
        await Post.findByIdAndDelete(_id);
        res.status(200).json({success:true,data:"deleted successfully"});
    }catch(error){
        console.log(error);
        res.status(500).json({success:false,data:"internal server error"})
    }
}
let likepost=async (req,res)=>{
    let {id:_id}=req.params;
    if (!req.userId) return res.status(400).json({success:false,data:"unauthenticated"});
    try{
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({success:false,data:"No post found"});
    
    let post=await Post.findById(_id);

    let index=post.likes.findIndex((id)=>id==req.userId);
        console.log(index);
    if(index!==-1){
        post.likes= post.likes.filter((id)=>id!==req.userId)
        console.log("kakaka");
    }
    else{
        post.likes.push(req.userId);
    }
    let newpost=await Post.findByIdAndUpdate(_id,post,{new:true})
    res.status(200).json({success:true,data:newpost});
    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false,data:"internal server error"})
    }

}
module.exports = { getpost, addpost,updatepost,deletepost,likepost}