import { Button, TextField, Typography } from '@material-ui/core';
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { newComment } from '../../State/actioncreators/posts';
import useStyles from "./styles"
// import {newComment} from "../../State/actioncreators/posts"
function Comments({expost}) {
    let classes=useStyles();
    let [commetns,setcommetns]=useState([1,2,3,4,5,6]);
    let {post}=useSelector((state)=>state.post);
    let [comment,setcomment]=useState("")
    let commentref=useRef();
    // console.log("cmtpost",post);
    let dispatch=useDispatch();
    let user=JSON.parse(localStorage.getItem("userdata"));
    // console.log("user",user);
    let handleClick=()=>{
        dispatch(newComment({id:expost._id,cmtdata:{name:user.name,cmt:comment}}))
        setcomment("")
        commentref.current.scrollIntoView({behavior:"smooth"})
    }
  return (
    <>
    {/* { */}
        {/*  user && */}
        <div className={classes.commentsOuterContainer}>
            <div className={classes.commentsInnerContainer}>
                <Typography style={{width:"350px"}} gutterBottom variant="h6">Commetns</Typography>
                {post.Comment.map((c,i)=>(
                    <Typography key={i} gutterBottom varaint="subtitle1">
                        <strong>{c.user}</strong>  &nbsp;: &nbsp;{c.cmt}
                    </Typography>
                ))}
                <div ref={commentref}></div>
            </div>
            <div style={{width:"70%"}}>
                <Typography varaint="h6" gutterBottom>
                    Write a Comment
                </Typography>
                <TextField 
                // style={{width:"00px"}}
                fullWidth
                minRows={4}
                variant="outlined"
                label="Comment"
                multiline
                value={comment}
                onChange={(e)=>setcomment(e.target.value)}
                />
                <Button disabled={comment==="" || user===null} onClick={handleClick} style={{marginTop:"10px"}} fullWidth color='primary' variant='contained'>Comment</Button>
            </div>
        </div>
{/* } */}
    </>
  )
}

export default Comments
