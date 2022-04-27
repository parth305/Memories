import React, { useContext } from "react";
import {Container} from "@material-ui/core"
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/Authentication/Auth";
import alertcontext from "./contextapi/Alert/alertcontext";
import Alerts from "./components/Alert/Alert";
function App() {
  let {alert}=useContext(alertcontext);
  return (
    <Container maxWidth="lg">
       <Alerts alert={alert} />
      <NavBar/>
      <Routes>
      <Route exact path="/"  element={<Home/>}></Route>
      <Route exact path="/auth"  element={<Auth/>}></Route>
      </Routes>
    </Container>
  );
}

export default App;
