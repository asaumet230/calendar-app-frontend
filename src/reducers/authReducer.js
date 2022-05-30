import { types } from "../types/types";

const initialState = {
    cheking: true,
    uid: null,
    name: null,
}


const authReducer = ( state = initialState, action) => {

    switch ( action.type ) {

        case types.authLogin:
            return {
                ...state,
                cheking: false,
                uid: action.payload.uid,
                name: action.payload.name,
            }
        
        case types.authChekingFinish:
            return {
                ...state,
                cheking: false,
            }

        default:
            return state;
    }    
}


export default authReducer;