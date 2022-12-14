import React, { useState } from 'react'
import tagcontext from './tagcontext'
import axios from "axios";
let API=axios.create({baseURL:"http://localhost:3030/"})

let url="post/";
function TagState(props) {
    
    let [tagpost,settagpost]=useState([]);
    let getpostbytag=async(tags)=>{
        let {data}=await API.get(`${url}/findbytags/${tags}`)
        // console.log(data);
        if(data.succes){
            // console.log(data.data);
            settagpost(data.data);
        }
    }
    return (
        <tagcontext.Provider value={{tagpost,getpostbytag}}>
            {props.children}
        </tagcontext.Provider>
    )
}

export default TagState
