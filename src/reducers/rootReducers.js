import { combineReducers } from "redux";

// Reducers:
import uiReducer from "./uiReducers";


const rootReducer = combineReducers({
    uis: uiReducer,
});


export default rootReducer;