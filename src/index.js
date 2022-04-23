import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from "./State/store";
import "./index.css"
import PostState from './contextapi/UpdatePost/PostState';

ReactDOM.render( 
  <Provider store={store}>
<PostState>
  <App />
</PostState>
  </Provider>
,document.getElementById('root'))
reportWebVitals();
