import React, { useEffect } from "react"
import {Pagination,PaginationItem} from "@material-ui/lab"
import {Link} from "react-router-dom"
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../State/actioncreators/posts";

let Paginate=({page})=>{
    const classes=useStyles();
    // console.log("page",page);
    let {totalPages}=useSelector((state)=>state.post);
    // console.log("total",posts);
    let dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getPost(page));
    },[page])
    return (
        <Pagination classes={{ul:classes.ul}}
        count={totalPages}
        page={page}
        variant="outlined"
        color="primary"
        renderItem={(item)=>(
            <PaginationItem  {...item} component={Link} to={`/posts?page=${item.page}`}/>
        )}
        
        />
    )
}

export default Paginate