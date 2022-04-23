const express=require("express");
const {getpost,addpost,updatepost, deletepost, likepost}=require("../controllers/postfunctions");
const { body, validationResult } = require('express-validator');

const router=express.Router();

router.route("/").get(getpost).post(addpost);
router.route("/:id").patch(updatepost).delete(deletepost);
router.route("/:id/likepost").patch(likepost);

module.exports=router