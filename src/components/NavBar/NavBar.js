import React, { useContext,useEffect } from 'react'
import { Link, useLocation } from "react-router-dom"
import { AppBar, Avatar, Typography, Button, Toolbar } from "@material-ui/core"
import useStyles from "./styles"
import usercontext from '../../contextapi/user/usercontext';
function NavBar() {
    let classes = useStyles();
    let location=useLocation();
    let { user, setuser } = useContext(usercontext);
    useEffect(() => {
        console.log("hello from nav bar");
        setuser(JSON.parse(localStorage.getItem("userdata")))
    }, [location])

    let logout = () => {
        localStorage.clear()
        setuser(null)
    }
   
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>

                <Typography component={Link} to="/" className={classes.heading} align="center" variant="h2">
                    Memories
                    <img className={classes.image} src="http://bit.ly/memories_image" alt="memories" height="60"></img>
                </Typography>
            </div>
            <Toolbar className={classes.toolbar}>

                {
                    user ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user.name} src={user.imageUrl}>{user.name ? user.name.charAt(0) : null}</Avatar>
                            <Typography className={classes.userrName} variant="h6">{user.name}</Typography>
                            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                        </div>
                    ) : (
                        <Button component={Link} variant="contained" to={location.pathname==="/"?"/auth":"/"} color='primary' >{location.pathname==="/"?"Sign In":"Home"}</Button>
                    )
                }
            </Toolbar>
        </AppBar>
    )
}

export default NavBar
