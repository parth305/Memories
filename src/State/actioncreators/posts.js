import * as api from "../../api/index"
export let getPost=()=>async (dispatch)=>{
    try {
        let {data}= await api.fetchposts();
        dispatch({type:"FETCH_ALL",payload:data.data});
    } catch (error) {
        console.log("error");
    }
    // dispatch(action)
}

export let creatPost=(Post)=>async (dispatch)=>{
    try{
        let {data}=await api.creatPost(Post);
        // console.log(data);
        dispatch({type:"CREATE",payload:data.data});
    }
    catch(error){
        console.log(error);
    }
}