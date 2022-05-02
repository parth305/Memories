const { validationResult } = require("express-validator");
const { default: mongoose } = require("mongoose");

const Post = require("../model/postmodel");
const User=require("../model/usermodel")
let getpost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            error: errors.array()[0]
        });
    }
    try {
        let {page}=req.query;
        let LIMIT=8;
        let total=await Post.countDocuments();
        let startIndex=(Number(page)-1)*LIMIT;
        let posts=await Post.find().sort({_id:-1}).limit(LIMIT).skip(startIndex);

        // console.log(posts);
        // let post = await Post.find(req.body);
        return res.status(200).json({ success: true, data: posts,pagenumber:Number(page),totalPages:Math.ceil(total/LIMIT) });
    }
    catch (error) {
        res.status(200).json({ success: false, msg: error.message });
    }
}

let addpost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            error: errors.array()[0]
        });
    }
    try {
        // let post=req.body;
        let newpost = req.body
        // console.log("ctrateinhg", newpost);
        let savedpost = new Post({ ...newpost, creator: req.userId,tags:newpost.tags.split(" "),Comment:[] });
        await savedpost.save()
        console.log(savedpost);
        res.status(200).json({ success: true, msg: "post added", data: savedpost })
    } catch (error) {
        // console.log("gheye");
        res.status(500).json({ success: false, msg: error.message })
    }
}

let updatepost = async (req, res) => {
    let { id: _id } = req.params;

    let post = req.body
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({ success: false, data: "No post found" });
        post={...post,tags:post.tags.split(" ")}
        let updatedpost = await Post.findByIdAndUpdate(_id, post, { new: true });
        // console.log("updated post",updatedpost);
        res.status(200).json({ success: true, data: updatedpost });
    }
    catch (error) {
        res.status(500).json({ success: false, data: "internal server error" })
    }
}

let getpostbyid=async(req,res)=>{
    // console.log("inside server");
    try {
        let {id:_id}=req.params
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({ success: false, data: "No post found" });
        let post=await Post.findById({_id});
        // console.log(post);
        return res.status(200).json({data:post,succes:true});
    } catch (error) {
        return res.status(200).json({data:error.message,success:false})
    }
}
let deletepost = async (req, res) => {
    let { id: _id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({ success: false, data: "No post found" });
        await Post.findByIdAndDelete(_id);
        res.status(200).json({ success: true, data: "deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, data: "internal server error" })
    }
}
let likepost = async (req, res) => {
    let { id: _id } = req.params;
    if (!req.userId) return res.status(400).json({ success: false, data: "unauthenticated" });
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({ success: false, data: "No post found" });

        let post = await Post.findById(_id);

        let index = post.likes.findIndex((id) => id == req.userId);
        console.log(index);
        if (index !== -1) {
            post.likes = post.likes.filter((id) => id !== req.userId)
            // console.log("kakaka");
        }
        else {
            post.likes.push(req.userId);
        }
        let newpost = await Post.findByIdAndUpdate(_id, post, { new: true })
        res.status(200).json({ success: true, data: newpost });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, data: "internal server error" })
    }

}

let getpostbysearch = async (req, res) => {
    // console.log(req.query);
    let { search, tags } = req.query;

    try {

        let title = new RegExp(search, "i");
        let posts = []

        let LIMIT=8;
        let total=await Post.countDocuments();

        if (tags === "" && search !== "") {
            posts = await Post.find({ title })
            // console.log("one");
        }
        else if (search === "" && tags !== "") {
            // console.log( tag.split(","));
            posts = await Post.find({ tags: { $in: tags.split(",") } })
            // console.log("rwo");
        }
        else if (search !== "" && tags !== "") {
            posts = await Post.find({ $or: [{ title }, { tags: { $in: tags.split(",") } }] })
            // console.log("threee");
        }
        else {
            // console.log("okay");
            return res.status(200).json({ data: "no data found", success: false,empty:true })
        }
        // console.log(posts);
        if (posts.length === 0) {
            // console.log("no");
            return res.status(200).json({ data: "no data found", success: false })
        }
        // return res.status(200).json({ data: posts, success: true })
        return res.status(200).json({ success: true, data: posts,pagenumber:Number(1),totalPages:Math.ceil(total/LIMIT) });
    } catch (error) {
        console.log(error);
    }
}

let getpostbytags=async (req,res)=>{
    try {
        // console.log("tags");
       let {tags} = req.params;
    //    console.log(req.params);
    //    console.log(req.body);
       let posts=await Post.find( { tags: { $in: tags.split(" ") } })
       console.log(posts);
        return res.status(200).json({succes:true,data:posts})
    } catch (error) {
        console.log(error);
        res.status(200).json({succes:false,data:"zero"})
    }
}

let addcmt=async (req,res)=>{
    try {
        let {name,cmt}=req.body
        console.log(name,cmt);
        let {id:_id}=req.params
        if (!req.userId) return res.status(400).json({ success: false, data: "unauthenticated" });
        let user=await User.findById(req.userId);
        console.log(user);
        let post=await Post.findById(_id);
        console.log("cmot",post.Comment);
        post={...post._do,Comment:post.Comment.concat({user:name,cmt:cmt})}
        console.log(post);
        let updatedpost = await Post.findByIdAndUpdate(_id, post, { new: true });
        console.log("udpado",updatedpost);
        return res.status(200).json({data:updatedpost,succes:true});
    } catch (error) {
        console.log(error);
        res.status(200).json({succes:false,data:"fail"})
    }
}
module.exports = { getpost, addpost, updatepost, deletepost, likepost, getpostbysearch,getpostbyid ,getpostbytags,addcmt}