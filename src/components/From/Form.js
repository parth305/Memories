import React, { useContext, useEffect, useState } from 'react'
import useStyles from "./styles";
import {Typography,Paper,Button,TextField} from "@material-ui/core";
import Filebase from "react-file-base64";
import { useDispatch, useSelector } from 'react-redux';
import { creatPost, updatepost } from '../../State/actioncreators/posts';
import Postcontext from '../../contextapi/UpdatePost/updatepostcontext';

function Form() {
    let classes=useStyles();
    let [postData,setpostData]=useState({creator:"",title:"",message:"",tags:"",selectedFile:null})
    let {currentid,setcurrentid}=useContext(Postcontext);
    let post=useSelector((state)=>currentid? state.post.find((message) => message._id === currentid):null);
    let dispatch=useDispatch();
    useEffect(()=>{
      if(post){
      setpostData(post)
      console.log(post);
    }
    },[currentid,dispatch])
    let handlesubmit=(e)=>{
      e.preventDefault();
      if(currentid){
        dispatch(updatepost(currentid,postData));
      }else{
      dispatch(creatPost(postData));
      }
      clear();
    }
    let clear=()=>{
      setcurrentid(null)
      setpostData({creator:"",title:"",message:"",tags:"",selectedFile:null})
      console.log("here",postData);
    }
    let Change=(e)=>setpostData({...postData,[e.target.name]:e.target.value})
  return (
    <Paper className={classes.paper}>
      <form autoComplete='off' onSubmit={handlesubmit} className={`${classes.root} ${classes.form}`} noValidate>
        <Typography variant='h6'>{currentid?"Edit":"Creating"} memories</Typography>
        <TextField name='creator' fullWidth label="Creator" variant='outlined' value={postData.creator} onChange={Change}/>
        <TextField name='title' fullWidth label="Title" variant='outlined' value={postData.title} onChange={Change}/>
        <TextField name='message' fullWidth label="Message" variant='outlined' value={postData.message} onChange={Change}/>
        <TextField name='tags' fullWidth label="Tags" variant='outlined' value={postData.tags} onChange={Change}/>
        <div className={classes.fileInput}>
          <Filebase type="file" multiple={false} onDone={({base64})=>setpostData({...postData,selectedFile:base64})}/>
        </div>
        <Button variant='contained' className={classes.buttonSubmit} color="primary" size="large" fullWidth type="submit">Submit</Button>
        <Button variant='contained'  color="secondary" size="small" onClick={clear} fullWidth >Clear</Button>
      </form>
    </Paper>
  )
}

export default Form
