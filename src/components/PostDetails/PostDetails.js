// import React, { useEffect } from 'react'
// import useStyles from "./styles"
import { useDispatch, useSelector } from "react-redux";

import React, { useContext, useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core/';
import moment from "moment";
import { useNavigate, useParams } from 'react-router-dom';
import { getpostbyid, getPostBySearch } from '../../State/actioncreators/posts';
import useStyles from './styles';
import alertcontext from "../../contextapi/Alert/alertcontext";
import { getpostbytags } from "../../State/actioncreators/posts";
import tagcontext from "../../contextapi/Tags/tagcontext";
import Comments from "./Comments";
let reccomandedposts=[]
function PostDetails() {
  let { post, posts, isloading ,recomandedpost} = useSelector((state) => state.post);
  let { showalert } = useContext(alertcontext);
  let {tagpost,getpostbytag}=useContext(tagcontext);
  // console.log("postdetails",post);
  // let post=posts.posts
  let navigate = useNavigate();
  let { id } = useParams();
  let dispatch = useDispatch();
  let classes = useStyles();
  // console.log(id);
  useEffect(() => {
    dispatch(getpostbyid(id));
  }, [id])

  useEffect(() => {
    if (post) {
      dispatch(getpostbytags(post.tags.join(" ")))
      // console.log(post.tags);
      // getpostbytag(post.tags.join(" "))
      // setTimeout(() => {
      //   // console.log(tagpost);
      //   reccomandedposts = tagpost.filter((_id) => post._id !== _id);
        
      //   console.log("rarar",reccomandedposts);
      // }, 2000);
    }
      
  }, [post])

  let openPost=(_id)=>navigate(`/posts/${_id}`);
  if (!post) {
    return null
  }
  if (isloading) {
    return (
      <Paper className={classes.loadingPaper} elevation={6}>
        <CircularProgress size="7em" />
      </Paper>
    )
  }

  return (
    // post?
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div elevation={12} className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0px',color:"black" }} />
          <hr />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0px' }} />
          <hr />
          <Comments expost={post}/>
          <Divider style={{ margin: '20px 0px' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>
      {recomandedpost.length!==0 ?
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You migth also like</Typography>
          <Divider />
          <hr />
          <div className={classes.recommendedPosts}>
            {recomandedpost.filter((current)=>current._id!=post._id).map(({_id, creator, name, title, message, tags, selectedFile, likes, date, __v}) => (
              <div  className={classes.shadow} style={{margin:"20px",padding:"5px",elevation:"6",borderRadius:"8px",cursor:"pointer",border:"1px solid black"}} onClick={()=>openPost(_id)} key={_id} >
                  <Typography gutterBottom variant="h6">{title}</Typography>
                  <Typography gutterBottom variant="subtitle2">{name}</Typography>
                  <Typography gutterBottom variant="subtitle2">{message}</Typography>
                  <Typography gutterBottom variant="subtitle1">Likes:{likes.length}</Typography>
                  <img src={selectedFile ||"https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"} width="200px"/>
                </div>
            ))}
          </div>
        </div>:null
}
      </Paper >
    )
}

      export default PostDetails
