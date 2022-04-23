import React from 'react'
import { useSelector } from 'react-redux';
import Post from './Post/Post'
import useStyles from "./styles";
import {Grid,CircularProgress} from "@material-ui/core"
function Posts() {
    let classes=useStyles();
    let posts=useSelector((state)=>state.post);
    
  return (
    !posts.length?<CircularProgress/>:
  
    <Grid className={classes.mainContainer} container alignItems='stretch' spacing={3}>
      {posts.map((post)=>(
        <Grid key={post._id} item  xs={12} sm={6}>
          <Post post={post}/>
        </Grid>
      ))}
    </Grid>
  )
}

export default Posts
