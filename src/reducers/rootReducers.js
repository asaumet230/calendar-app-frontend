import { combineReducers } from "redux";

// Reducers:
import uiReducer from "./uiReducers";
import calendarReducer from "./calendarReducer";
import authReducer from "./authReducer";


const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer,
    auth: authReducer
});


export default rootReducer;