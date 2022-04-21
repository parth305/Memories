const { validationResult } = require("express-validator");

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
    return res.status(200).json({success:true,msg:post});
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
        let savedpost=new Post(newpost);
        await savedpost.save()
        res.status(200).json({success:true,msg:"post added"})
    }catch(error){
        res.status(500).json({success:false,msg:error.message})
    }
}

module.exports = { getpost, addpost }