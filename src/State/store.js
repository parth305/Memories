import { createStore ,compose,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import reducers from "../State/reducers/index"
let store=createStore(reducers,compose(applyMiddleware(thunk)));
export default store

