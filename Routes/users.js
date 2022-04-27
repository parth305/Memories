const{ signin, signup }=require("../controllers/user")

const express=require("express");

const router=express.Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);

module.exports=router