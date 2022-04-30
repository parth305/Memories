import {LIKE,UPDATE,CREATE,FETCH_ALL,DELETE, FETCH_BY_SEARCH, START_LOADING, END_LOADING} from "../../constents/actionconstent"
let reducer=(state={isloading:true,posts:[]},action)=>{
    switch (action.type) {
        case START_LOADING:
            return {...state,isloading:true}
        case END_LOADING:
            return {...state,isloading:false}
        case FETCH_BY_SEARCH:
            console.log("fetach_by_search",action.payload);
            return {...state,posts:action.payload.data,pagenumber:action.payload.pagenumber,totalPages:action.payload.totalPages}
        case DELETE:
            return {...state,posts:state.posts.filter((post)=>post._id!==action.payload)};
        case UPDATE:
        case LIKE:
            return {...state,posts:state.posts.map((post)=>post._id===action.payload._id?action.payload:post)}
        case FETCH_ALL:
            return {...state,posts:action.payload.data,pagenumber:action.payload.pagenumber,totalPages:action.payload.totalPages}
        case CREATE:
            console.log("create",state,action.payload);
            return {...state,posts:[...state.posts,action.payload]}
        default:
            return state
    }
}

export default reducer