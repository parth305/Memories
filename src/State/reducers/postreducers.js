let reducer=(state=[],action)=>{
    switch (action.type) {
        case "FETCH_ALL":
            return action.payload
        case "CREATE":
            console.log(state,action.payload);
            return [...state,action.payload]
        default:
            return state
    }
}

export default reducer