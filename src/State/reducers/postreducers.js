import {LIKE,UPDATE,CREATE,FETCH_ALL,DELETE} from "../../constents/actionconstent"
let reducer=(state=[],action)=>{
    switch (action.type) {
        case DELETE:
            return state.filter((post)=>post._id!==action.payload);
        case UPDATE:
        case LIKE:
            return state.map((post)=>post._id===action.payload._id?action.payload:post)
        case FETCH_ALL:
            return action.payload
        case CREATE:
            console.log(state,action.payload);
            return [...state,action.payload]
        default:
            return state
    }
}

export default reducer