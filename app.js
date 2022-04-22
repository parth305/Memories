const  bodyParser = require("body-parser");
const express=require("express");
const cors=require("cors")
const { default: mongoose } = require("mongoose");
const postrouter=require("./Routes/postroutes")

const app=express();
const port=3030;


app.use(bodyParser.json({limit:"30mb",extented:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extented:true}))
app.use(cors());

app.use("/post",postrouter);

// const url="mongodb+srv://bhyu:database305@cluster0.yv9d2.mongodb.net/Memoriesdb?retryWrites=true&w=majority"
const url='mongodb://localhost/bhyu'
mongoose.connect(url).then(() => {
    app.listen(port,()=>{
        console.log("app started")
    })
}).catch(err => console.log(err.message))

// mongoose.set("useFindAndModify",false)