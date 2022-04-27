import { combineReducers } from "redux";
import { Authentication } from "./authreducer";
import postreducer from "./postreducers";

export default  combineReducers({
    post:postreducer
    ,auth:Authentication
});