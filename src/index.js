import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from "./State/store";
import "./index.css"
import PostState from './contextapi/UpdatePost/PostState';
import { BrowserRouter } from 'react-router-dom';
import UserState from './contextapi/user/Userstate';
import AlertState from './contextapi/Alert/alertState';
ReactDOM.render( 
  <BrowserRouter>
  <Provider store={store}>
   <UserState>
  <AlertState>

<PostState>
  <App />
</PostState>
  </AlertState>
   </UserState>
  </Provider>
  </BrowserRouter>
,document.getElementById('root'))
reportWebVitals();
