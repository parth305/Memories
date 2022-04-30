const bcrypt=require("bcryptjs")
const User=require("../model/usermodel");
const jwt=require("jsonwebtoken")
const JWT_SECERET="THISISSECRET";
let signup=async(req,res)=>{
    let {email,password,firstname,lastname}=req.body
    console.log(email);
    
    try{
    let olduser=await User.findOne({email});
    if (olduser) return res.status(400).json({succes:false,data:"user already exists"});

    let salt =await bcrypt.genSalt(10);
    let hash=await bcrypt.hash(password,salt);
    // console.log("hey");
    let newuser=await User.create({name:`${firstname} ${lastname}`,email:email,password:hash});
    // console.log(newuser);
    let token=jwt.sign({email:newuser.email,id:newuser._id},JWT_SECERET);
    // console.log(token);
    return res.status(200).json({data:newuser,token:token,succes:true});
    }
    catch(error){
        // console.log(error);
        return res.status(500).json({success:false,data:error.message})
    }
    
}

let signin=async(req,res)=>{
    let {email,password}=req.body;
    try{
        console.log("before find");
        let user=await User.findOne({email});
        if (!user) return res.status(200).json({data:"user does not exist",success:false});
        console.log("after find");

    let checkpass=await bcrypt.compare(password,user.password);
    if(!checkpass) return res.status(200).json({data:"incorect password",success:false});
    
    let token=jwt.sign({email:user.email,id:user._id},JWT_SECERET);
    return res.status(200).json({data:user,token:token,success:true});
    }catch(error){
        console.log(error);
        return res.status(500).json({data:"internal server error",success:false});
    }
}

module.exports= {signin,signup}