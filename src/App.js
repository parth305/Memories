import React, { useContext } from "react";
import {Container} from "@material-ui/core"
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import { Route, Routes,Navigate } from "react-router-dom";
import Auth from "./components/Authentication/Auth";
import alertcontext from "./contextapi/Alert/alertcontext";
import Alerts from "./components/Alert/Alert";
import PostDetails from "./components/PostDetails/PostDetails";
import usercontext from "./contextapi/user/usercontext";
function App() {
  let {alert}=useContext(alertcontext);
  let {user}=useContext(usercontext);
  return (
    <Container maxWidth="xl">
       <Alerts alert={alert} />
      <NavBar/>
      <Routes>
      <Route exact path="/"  element={<Navigate to="/posts"/>}></Route>
      <Route exact path="/posts"  element={<Home/>}></Route>
      <Route exact path="/posts/search"  element={<Home/>}></Route>
      <Route exact path="/posts/:id"  element={<PostDetails/>}></Route>
      <Route exact path="/auth"  element={user?<Navigate to="/posts"/>:<Auth/>}></Route>
      </Routes>
    </Container>
  );
}

export default App;
