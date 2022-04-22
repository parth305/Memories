import React, { useState } from 'react'
import useStyles from "./styles";
import {Typography,Paper,Button,TextField} from "@material-ui/core";
import Filebase from "react-file-base64";
import { useDispatch } from 'react-redux';
import { creatPost } from '../../State/actioncreators/posts';
function Form() {
    let classes=useStyles();
    let [postData,setpostData]=useState({creator:"",title:"",message:"",tags:"",selectedFile:""})
    let dispatch=useDispatch();
    let handlesubmit=(e)=>{
      e.preventDefault();
      dispatch(creatPost(postData));
    }
    let clear=()=>{

    }
    let Change=(e)=>setpostData({...postData,[e.target.name]:e.target.value})
  return (
    <Paper className={classes.paper}>
      <form autoComplete='off' onSubmit={handlesubmit} className={`${classes.root} ${classes.form}`} noValidate>
        <Typography variant='h6'>Creating memories</Typography>
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
