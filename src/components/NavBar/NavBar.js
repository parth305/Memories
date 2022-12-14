import React, { useContext, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom"
import { AppBar, Avatar, Typography, Button, Toolbar } from "@material-ui/core"
import useStyles from "./styles"
import usercontext from '../../contextapi/user/usercontext';
import decode from "jwt-decode"
import logo from "../../../src/logo.png"
function NavBar() {
    let classes = useStyles();
    let location = useLocation();
    let { user, setuser } = useContext(usercontext);
    useEffect(() => {
        // console.log("hello from nav bar");
        let token = localStorage.getItem("token");
        if (token) {
            let decodedata = decode(token);
            if (decodedata.exp * 1000 < new Date().getTime()) logout();
        }
        else {
            logout();
        }
        setuser(JSON.parse(localStorage.getItem("userdata")))
    }, [location])

    let logout = () => {
        localStorage.clear()
        setuser(null)
    }

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" className={classes.brandContainer}>
                <img src={logo} alt="Icon" height="65px" />
                {/* <img src="https://i.ibb.co/cvkcJFm/memories-Text.png" alt="Icon" height="45px" /> */}
                {/* <img className={classes.image} src="https://i.ibb.co/NyJqJWK/memories-Logo.png" alt="memories" height="40px"></img> */}
            </Link>
            <Toolbar className={classes.toolbar}>

                {
                    user ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user.name} src={user.imageUrl}>{user.name ? user.name.charAt(0) : null}</Avatar>
                            <Typography className={classes.userrName} variant="h6">{user.name}</Typography>
                            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                        </div>
                    ) : (
                        <Button component={Link} variant="contained" to={location.pathname === "/posts" ? "/auth" : "/posts"} color='primary' >{location.pathname === "/posts" ? "Sign In" : "Home"}</Button>
                    )
                }
            </Toolbar>
        </AppBar>
    )
}

export default NavBar
