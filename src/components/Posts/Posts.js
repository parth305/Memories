import React from 'react'
import { useSelector } from 'react-redux';
import Post from './Post/Post'
import useStyles from "./styles";
function Posts() {
    let classes=useStyles();
    let posts=useSelector((state)=>state.post);
    console.log(posts);

  return (
    <div>
      this is Posts
      <Post/>
      <Post/>
    </div>
  )
}

export default Posts
