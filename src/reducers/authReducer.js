import { types } from "../types/types";

const initialState = {
    checking: true,
    uid: null,
    name: null,
}


const authReducer = ( state = initialState, action) => {

    switch ( action.type ) {

        case types.authLogin:
            return {
                ...state,
                checking: false,
                uid: action.payload.uid,
                name: action.payload.name,
            }
        
        case types.authChekingFinish:
            return {
                ...state,
                checking: false,
            }
        
        case types.authLogout:
            return {
                checking: false,
            }

        default:
            return state;
    }    
}


export default authReducer;