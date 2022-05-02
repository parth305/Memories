import {LIKE,UPDATE,CREATE,FETCH_ALL,DELETE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, FIND_BY_ID, SERACH_BY_TAG, COMMENT} from "../../constents/actionconstent"
let reducer=(state={isloading:true,posts:[],recomandedpost:[],cmtpost:[]},action)=>{
    switch (action.type) {
        case COMMENT:
            // console.log("payload",action.payload);
            return {...state,post:action.payload}
        case SERACH_BY_TAG:
            return {...state,recomandedpost:action.payload}
        case FIND_BY_ID:
            return {...state,post:action.payload}
        case START_LOADING:
            return {...state,isloading:true}
        case END_LOADING:
            return {...state,isloading:false}
        case FETCH_BY_SEARCH:
            // console.log("fetach_by_search",action.payload);
            return {...state,posts:action.payload.data,pagenumber:action.payload.pagenumber,totalPages:action.payload.totalPages}
        case DELETE:
            return {...state,posts:state.posts.filter((post)=>post._id!==action.payload)};
        case UPDATE:
        case LIKE:
            return {...state,posts:state.posts.map((post)=>post._id===action.payload._id?action.payload:post)}
        case FETCH_ALL:
            return {...state,posts:action.payload.data,pagenumber:action.payload.pagenumber,totalPages:action.payload.totalPages}
        case CREATE:
            // console.log("create",state,action.payload);
            return {...state,posts:[...state.posts,action.payload]}
        default:
            return state
    }
}

export default reducer