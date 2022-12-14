import React, { useContext, useState } from 'react'
import useStyles from "./styles";
import { Card, CardActions, CardContent, Typography, CardMedia, Button, ButtonBase } from "@material-ui/core"
import ThumbUpOutlined from '@material-ui/icons/ThumbUpOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined"
import DeleteIcon from "@material-ui/icons/Delete"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"
import moment from 'moment';
import PostContext from "../../../contextapi/UpdatePost/updatepostcontext"
import { useDispatch } from 'react-redux';
import { deletepost, getpostbyid, likepost } from '../../../State/actioncreators/posts';
import usercontext from '../../../contextapi/user/usercontext';
import alertcontext from '../../../contextapi/Alert/alertcontext';
import { Navigate, useNavigate } from "react-router-dom";

const Likes = ({post,user}) => {
  if (post.likes.length > 0 && user) {
    return post.likes.find((like) => like === (user.googleId || user._id))
      ? (
        <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
      ) : (
        <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
      );
  }
  return <><ThumbUpOutlined fontSize="small" />&nbsp;Like</>;
};

function Post({ post }) {
  let { setcurrentid } = useContext(PostContext);
  let classes = useStyles();
  let dispatch = useDispatch();
  let { user } = useContext(usercontext);
  let { showalert } = useContext(alertcontext);
  let navigate = useNavigate();
  // console.log("heheheheh",user.googleId,post.creator);
  let [likes,setlikes]=useState(post.likes);
  // let userid=user!==null?(user.googleId || user._id):null
  // let userhaslikedpost=post.likes.find((like) => like === (user.googleId || user._id));
  const openPost = () => {
    // dispatch(getpostbyid(post._id))
    navigate(`${post._id}`)
  }
  
  let handlelike=() => { 
    dispatch(likepost(post._id)) 
    // if (userhaslikedpost){
      // setlikes(likes.filter((id)=>id!==userid))
    // }
    // else{
      // setlikes(likes.concat(userid))
    // }

  }

  return (
    <Card className={classes.card} raised elevation={9}>
     
        <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">{moment(post.date).fromNow()}</Typography>
        </div>
        {user && (user.googleId === post.creator || user._id === post.creator) && (
          <div className={classes.overlay2}>
            <Button style={{ color: 'white' }} size="small" onClick={() => {
              // currentid?setcurrentid(null):
              setcurrentid(post._id)
            }}><MoreHorizIcon fontSize="medium" /></Button>
          </div>
        )}
         <ButtonBase className={classes.cardAction} onClick={openPost}>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{post.message.slice(0,100)}....</Typography>
        </CardContent>
        </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user ? true : false} onClick={handlelike} ><Likes post={post} user={user} /> </Button>
        {user && (user.googleId === post.creator || user._id === post.creator) && (
          <Button size="small" color="primary" onClick={() => { dispatch(deletepost(post._id, showalert)) }}><DeleteIcon fontSize="small" /> Delete</Button>
          )}
      </CardActions>
         
    </Card>
  )
}

export default Post
