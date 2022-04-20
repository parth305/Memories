const express=require("express");
const {getpost,addpost}=require("../controllers/postfunctions");
const { body, validationResult } = require('express-validator');

const router=express.Router();

router.route("/").get(getpost).post(addpost);

module.exports=router