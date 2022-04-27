const  bodyParser = require("body-parser");
const express=require("express");
const cors=require("cors")
const { default: mongoose } = require("mongoose");
const postrouter=require("./Routes/postroutes");
const userrouter=require("./Routes/users");
const dotenv=require("dotenv")
const app=express();
const port=3030;


app.use(bodyParser.json({limit:"30mb",extented:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extented:true}))
app.use(cors());
dotenv.config();

app.use("/post",postrouter);
app.use("/user",userrouter)

// url=process.env.MONGO_URL
url=process.env.LOCAL_DB
// let url="mongodb+srv://bhyu:305atlasdb@cluster0.yv9d2.mongodb.net/Memoriesdb?retryWrites=true&w=majority"
// let url="mongodb+srv://js_mastery:123123123@practice.jto9p.mongodb.net/test"
mongoose.connect(url).then(() => {
    app.listen(port,()=>{
        console.log("app started")
    })
}).catch(err => console.log(err.message))