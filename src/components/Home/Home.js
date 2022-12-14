import React, { useContext,useEffect, useState } from 'react'
import Form from '../From/Form';
import Posts from '../Posts/Posts';
import { Grow, Grid, Container, Paper, AppBar, TextField, Button } from "@material-ui/core"
import { getPost, getPostBySearch } from "../../State/actioncreators/posts";
import useStyles from "./styles";
import { useDispatch } from 'react-redux';
import Paginate from '../pagination/Pagination';
import { useLocation, useNavigate } from 'react-router-dom';
import ChipInput from "material-ui-chip-input";
import alertcontext from '../../contextapi/Alert/alertcontext';
function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function Home() {
  let {showalert}=useContext(alertcontext);
  let query = useQuery();
  let page=query.get("page") || 1;
  // console.log("query page",page);
  // let searchQuery=query.get("searchQuery");
  let navigate = useNavigate();
  // let location = useLocation();
  let classes = useStyles();
  let disptach = useDispatch();
  let [search,setsearch]=useState("");
  let [tags,settags]=useState([]);
  let handleAdd=(tag)=>{
      settags(tags.concat(tag))
      // searchpost();
      // navigate(`/posts/search?search=${search.trim()||"none"}&tags=${tags.concat(tag).join(",")}`);
    disptach(getPostBySearch({searchquery:{search,tags:tags.concat(tag).join(",")},showalert}))
    
  }
  
  let handleDelete=(tagtodelete)=>{
    // console.log("Delete");
    settags(tags.filter((tag)=>tag!==tagtodelete))
    if(tags.length!==1){
    disptach(getPostBySearch({search,tags:tags.filter((tag)=>tag!==tagtodelete).join(",")}))
    }else{
      if(!search.trim()){
        navigate("/posts")
        disptach(getPost(1))
        // console.log("jjsjj");
      }
    }
    // console.log(tags);
  }
  // disptach(getPost());

  let handleKeyPress=(event)=>{
    if(event.keyCode===13){
      // console.log("enter was pressed");
      searchpost();
    }
  }

  let searchpost=()=>{
    // console.log("heerer");
    if(search.trim()!==""||tags.length!==0){
      disptach(getPostBySearch({searchquery:{search:search.trim(),tags:tags.join(",")},showalert}))
      // navigate(`/posts/search?search=${search.trim()||"none"}&tags=${tags}`);
    }
    else{
      disptach(getPost(1))
      navigate("/posts");
    }
  }
  useEffect(() => {
    // console.log("kaksakskaksalslasl");
    if(search===""){
    disptach(getPost());
    navigate("/posts")
    }
  }, [search])
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={4} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color='inherit'>
              <TextField name='search' variant='outlined' onKeyDown={handleKeyPress} label="Search Memories" fullWidth value={search} onChange={(e)=>{
                setsearch(e.target.value)
                searchpost();
              }}/>
              <ChipInput
               style={{margin:"10px 0"}}
              variant="outlined"
              onAdd={handleAdd}
              onDelete={handleDelete}
              label="Search Tags"
              value={tags}
              />
              <Button onClick={searchpost} variant="contained" className={classes.searchbutton} color="primary">Search</Button>
            </AppBar>
            <Form />
            {
              search==="" && tags.length===0?
            <Paper className={classes.pagination} elevation={5}>
              <Paginate page={Number(page)} />
            </Paper>:null
}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home
