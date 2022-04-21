import React from 'react'
import Post from './Post/Post'
import useStyles from "./styles";
function Posts() {
    let classes=useStyles();
  return (
    <div>
      this is Posts
      <Post/>
      <Post/>
    </div>
  )
}

export default Posts
