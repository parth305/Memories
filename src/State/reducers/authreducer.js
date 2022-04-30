
import {AUTH, SIGNIN, SIGNUP} from "../../constents/actionconstent";

export let Authentication=(state={authdata:null},action)=>{
    switch (action.type) {
        case AUTH:
            console.log(action.payload.result);
            localStorage.setItem("userdata",JSON.stringify(action.payload.result));
            localStorage.setItem("token",action.payload.token);
            return {...state,authdata:action.payload}
        case SIGNUP:
            console.log(action.payload);
            localStorage.setItem("userdata",JSON.stringify(action.payload.data));
            localStorage.setItem("token",action.payload.token);
            return {...state,authdata:action.payload}
        
       case SIGNIN:
                console.log("here",action.payload);
                localStorage.setItem("userdata",JSON.stringify(action.payload.data));
                localStorage.setItem("token",action.payload.token);
                return {...state,authdata:action.payload}
        default:
            return state
    }
}

