import { combineReducers } from "redux";

// Reducers:
import uiReducer from "./uiReducers";


const rootReducer = combineReducers({
    ui: uiReducer,
});


export default rootReducer;