const jwt =require("jsonwebtoken");


const JWT_SECERET="THISISSECRET";
let check=async(req,res,next)=>{
    try{
    let token =req.headers.authorization.split(" ")[1];
    // console.log(token);
    let isgoogletoken=token.length>500;
        if(isgoogletoken){
            let decodedata=jwt.decode(token);
            console.log(decodedata);
            req.userId=decodedata.sub
        }
        else{
            let data=jwt.verify(token,JWT_SECERET);
            console.log(data);
            req.userId=data.id
        }
        console.log("token complete");
        console.log(req.userId);
        next();
    }
    catch(error){
        console.log(error);
        return res.status(500).json({success:false,data:"internal server error"});
    }
}
module.exports=check