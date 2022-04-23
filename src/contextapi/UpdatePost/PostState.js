import {useState} from "react";
import postcontext from "./updatepostcontext";
import React from 'react'

let PostState=(props)=>{
    let [currentid,setcurrentid]=useState(null);
    return(
        <postcontext.Provider value={{currentid,setcurrentid}}>
        {props.children}
        </postcontext.Provider>
    )
}

export default PostState