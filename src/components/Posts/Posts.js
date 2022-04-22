import React from 'react'
import { useSelector } from 'react-redux';
import Post from './Post/Post'
import useStyles from "./styles";
import {Grid,CircularProgress} from "@material-ui/core"
// import moment from "moment"
function Posts() {
    let classes=useStyles();
    let posts=useSelector((state)=>state.post);
    console.log(posts);

  return (
    !posts.length?<CircularProgress/>:
  
    <Grid className={classes.mainContainer} container alignItems='stretch' spacing={3}>
      {posts.map((post)=>(
        <Grid item key={post._id} xs={12} sm={6}>
          <Post post={post}/>
        </Grid>
      ))}
    </Grid>
  )
}

export default Posts
