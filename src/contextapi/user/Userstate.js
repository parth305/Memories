import { useState } from "react";
import usercontext from "./usercontext";
import React from "react"

let UserState=(props)=>{
    let [user,setuser]=useState(null);
    return (
    <usercontext.Provider value={{user,setuser}}>
        {props.children}
    </usercontext.Provider>
    )

}
export default UserState