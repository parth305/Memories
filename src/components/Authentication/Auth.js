import { Avatar, Container, Paper, Button, Typography, Grid } from '@material-ui/core';
import React, { useContext, useState } from 'react'
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import GoogleLogin from "react-google-login";
import useStyles from "./styles"
import Input from './Input';
import Icon from './Icon';
import { useDispatch } from 'react-redux';
import {Authaction, signin} from "../../State/actioncreators/Authaction"
import { useNavigate } from 'react-router-dom';
import usercontext from '../../contextapi/user/usercontext';
import { signup } from '../../State/actioncreators/Authaction';
import alertcontext from '../../contextapi/Alert/alertcontext';
function Auth() {
    let initialstate={firstname:"",lastname:"",email:"",password:"",confirmpassword:""}
    let [formData,setformData]=useState(initialstate);
    let classes = useStyles();
    let [issignup, setsignup] = useState(false);
    let [showpass, setshowpass] = useState(false);
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let {showalert}=useContext(alertcontext);
    let {setuser}=useContext(usercontext);
    let handlechange = (event) => {
        setformData({...formData,[event.target.name]: event.target.value})
    }
    let GoogleSuccess = (res) => {
        let result = res.profileObj
        let token = res.tokenId
        setuser(result)
        dispatch(Authaction({ result, token }));
        navigate("/")
    }
    let GoogleFailure = (error) => {
        console.log(error);
        console.log("google login failure,try again later");
    }
    let handlesubmit = (event) => {
        event.preventDefault();
        if(issignup){
                if (formData.password===formData.confirmpassword){
                    console.log("hey");
                    console.log(formData);
                dispatch(signup(formData,navigate))
                }
                else{
                    if(issignup){
                    showalert("error","password does not match")}
                }
            }
            else{
                dispatch(signin(formData,navigate))
            }
 
       
    }
    let handleShowPassowrd = () => {
        if (showpass) {
            setshowpass(false)
        }
        else {
            setshowpass(true)
        }
    }
    let switchmode = () => {
        setsignup((previssignup) => !previssignup)
        setshowpass(false)
    }
    return (
        <Container maxWidth="xs" component="main">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{issignup ? "Sign Up" : "Sign In"}</Typography>
                <form onSubmit={handlesubmit} className={classes.form}>
                    <Grid container spacing={2}>
                        {
                            issignup && (
                                <>
                                    <Input name="firstname" label="First Name"  autoFocus type="text" xs={6} handlechange={handlechange} half />
                                    <Input name="lastname"  label="Last Name" type="text" xs={6} handlechange={handlechange} half />
                                </>
                            )
                        }
                        <Input name="email" type="email"  handlechange={handlechange} label="Email Address" />
                        <Input name="password"  type={showpass ? "text" : "password"} handlechange={handlechange} handleShowPassowrd={handleShowPassowrd} label="Password" />
                        {issignup && <Input name="confirmpassword"  label="Confirm Password" handlechange={handlechange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>{issignup ? "Sign Up" : "Log in"}</Button>
                    <GoogleLogin
                        clientId='939521767988-0t6vfkj0elr0ldpojli2v3kiu99ht7v7.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color="secondary" fullWidth onClick={renderProps.onClick}
                                disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                Google Signin
                            </Button>
                        )}
                        onSuccess={GoogleSuccess}
                        onFailure={GoogleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justifyContent='center'>
                        <Grid item>
                            <Button onClick={switchmode}>
                                {issignup ? "Already have an account?Log in" : "Don't have an account?Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
