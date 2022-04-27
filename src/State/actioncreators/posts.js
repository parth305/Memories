import * as api from "../../api/index"
import { CREATE, DELETE, FETCH_ALL, LIKE, UPDATE } from "../../constents/actionconstent";
export let getPost=()=>async (dispatch)=>{
    try {
        let {data}= await api.fetchposts();
        dispatch({type:FETCH_ALL,payload:data.data});
    } catch (error) {
        console.log("error");
    }
    // dispatch(action)
}

export let creatPost=(Post)=>async (dispatch)=>{
    try{
        console.log("post",Post);
        let {data}=await api.creatPost(Post);
        console.log("here",data)
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

export let deletepost=(id)=>async (dispatch)=>{
    try {
        let {data}=await api.deletepost(id);
        console.log(data);
        dispatch({type:DELETE,payload:id})
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