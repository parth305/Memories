import { useState } from "react"
import alertcontext from "./alertcontext"
import React from "react";

let AlertState=(props)=>{

    let [alert,setalert]=useState(null);

    function showalert(type,message){
        setalert({
            msg: message,
            type: type
        })
        setTimeout(() => {
            setalert(null);
        }, 3000);
    }
    
    return (
        <alertcontext.Provider value={{alert,showalert}}>
            {props.children}
            </alertcontext.Provider>
    )
}

export default AlertState