import React, { useEffect } from 'react'
import Form from '../From/Form';
import Posts from '../Posts/Posts';
import {Grow,Grid,Container} from "@material-ui/core"
import { getPost } from "../../State/actioncreators/posts";
import useStyles from "./styles";
import { useDispatch } from 'react-redux';

function Home() {
    let classes=useStyles();
    let disptach=useDispatch();
    disptach(getPost());
    useEffect(()=>{
      disptach(getPost());
    },[disptach])
  return (
    <Grow in>
        <Container>
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={4} className={classes.mainContainer}>
            <Grid item xs={12} sm={7}>
                <Posts/>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Form/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
  )
}

export default Home
