import { combineReducers } from "redux";

// Reducers:
import uiReducer from "./uiReducers";
import calendarReducer from "./calendarReducer";


const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer,
});


export default rootReducer;