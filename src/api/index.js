import axios from "axios";

let url="http://localhost:3030/post/";

export let fetchposts=()=>axios.get(url);

export let creatPost=(newPost)=>axios.post(url,newPost)