const express=require("express");
const {getpost,addpost,updatepost}=require("../controllers/postfunctions");
const { body, validationResult } = require('express-validator');

const router=express.Router();

router.route("/").get(getpost).post(addpost);
router.route("/:id").patch(updatepost);

module.exports=router