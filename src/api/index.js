import axios from "axios";

let url="http://localhost:3030/post/";

export let fetchposts=()=>axios.get(url);

export let creatPost=(newPost)=>axios.post(url,newPost);

export let updatepost=(id,updatedpost)=>axios.patch(`${url}${id}`,updatedpost);

export let deletepost=(id)=>axios.delete(`${url}${id}`);

export let likecount=(id)=>axios.patch(`${url}${id}/likepost`);