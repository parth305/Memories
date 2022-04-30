const express=require("express");
const {getpost,addpost,updatepost, deletepost, likepost,getpostbysearch}=require("../controllers/postfunctions");
const { body, validationResult } = require('express-validator');
const check = require("../middleware/verifyuser");
// const { getPostBySearch } = require("../../client/src/State/actioncreators/posts");

const router=express.Router();

router.route("/").get(getpost);
router.route("/search").get(getpostbysearch);
router.use(check)
router.route("/").post(addpost);
router.route("/:id").patch(updatepost).delete(deletepost);
router.route("/:id/likepost").patch(likepost);

module.exports=router