import * as api from "../../api/index"
import { CREATE, DELETE, FETCH_ALL, FETCH_BY_SEARCH, LIKE, UPDATE } from "../../constents/actionconstent";
export let getPost=(page)=>async (dispatch)=>{
    try {
        let {data}= await api.fetchposts(page);
        // console.log(data);
        dispatch({type:FETCH_ALL,payload:data});
    } catch (error) {
        console.log("error");
    }
    // dispatch(action)
}

export let getPostBySearch=({searchquery,showalert})=>async (dispatch)=>{
    try {
        console.log(searchquery);
        let {data}=await api.featchpostbysearch(searchquery);
        // console.log("search",data.data);
        if(!data.success){
            showalert("error",data.data)
        }
        else{
        dispatch({type:FETCH_BY_SEARCH,payload:data})
        }
    } catch (error) {
        console.log(error);
    }
}

export let creatPost=(Post)=>async (dispatch)=>{
    try{
        // console.log("post",Post);
        let {data}=await api.creatPost(Post);
        // console.log("here",data)
        dispatch({type:CREATE,payload:data.data});
        dispatch(getPost());   
    }
    catch(error){
        console.log(error);
    }
}

export let updatepost=(id,newpost)=> async (dispatch)=>{
    try {
        let {data}=await api.updatepost(id,newpost)
        dispatch({type:UPDATE,payload:data.data});
    } catch (error) {
        console.log(error);
    }
}

export let deletepost=(id,showalert)=>async (dispatch)=>{
    try {
        let {data}=await api.deletepost(id);
        console.log(data);
        if(data.success){
            // alert(data.data)
            showalert("error",data.data)
            dispatch({type:DELETE,payload:id})
        }
        else{
            showalert("error","could not delete post")
        }
    } catch (error) {
        console.log(error);
    }
}

export let likepost=(id)=>async (dispatch)=>{
        try {
            console.log(id);
            let {data}=await api.likecount(id)
            console.log(data);
            dispatch({type:LIKE,payload:data.data});
        } catch (error) {
            console.log(error);
        }
}