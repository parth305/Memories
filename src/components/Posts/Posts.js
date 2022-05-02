import React from 'react'
import { useSelector } from 'react-redux';
import Post from './Post/Post'
import useStyles from "./styles";
// import InfiniteScroll from 'react-infinite-scroll-component';
import {Grid,CircularProgress} from "@material-ui/core"
function Posts() {
    let classes=useStyles();
    let posts=useSelector((state)=>state.post);
    // console.log("posts",posts);
    // let posts=data
  if(posts.posts.length===0 && !posts.isloading) return "No Data to Show"
  return (
    posts.isloading?<CircularProgress/>:
    <Grid className={classes.mainContainer} container alignItems='stretch' spacing={3}>
      {posts.posts.map((post)=>(
        <Grid key={post._id} item  xs={12} sm={6} lg={3}>
          <Post post={post}/>
        </Grid>
      ))}
      </Grid>
  )
}

export default Posts
