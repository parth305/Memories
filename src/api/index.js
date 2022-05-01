import axios from "axios";

let API=axios.create({baseURL:"http://localhost:3030/"})

let url="post/";

let userurl="user/";
export let singin=(formdata)=>API.post(`${userurl}signin`,formdata);

export let signup=(formdata)=>API.post(`${userurl}signup`,formdata);
API.interceptors.request.use((req)=>{
    if(localStorage.getItem("token")){
        req.headers.Authorization=`Bearer ${localStorage.getItem("token")}`;
    }
    return req
})
export let fetchposts=(page)=>API.get(`post?page=${page}`);

export let featchpostbysearch=(searchquery)=>API.get(`${url}search?search=${searchquery.search}&tags=${searchquery.tags}`);

export let getpostbyid=(id)=>API.get(`${url}${id}`);

export let featchbytag=(tags)=>API.get(`${url}/findbytags/${tags}`);

export let creatPost=(newPost)=>API.post(url,newPost);

export let updatepost=(id,updatedpost)=>API.patch(`${url}${id}`,updatedpost);

export let deletepost=(id)=>API.delete(`${url}${id}`);

export let likecount=(id)=>API.patch(`${url}${id}/likepost`);

