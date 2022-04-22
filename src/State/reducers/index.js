import { combineReducers } from "redux";
import postreducer from "./postreducers";

export default  combineReducers({
    post:postreducer
});