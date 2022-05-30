import { types } from "../types/types";
import Swal from "sweetalert2";

// Helpers:
import { fetchSinToken } from "../helpers/fetch"


// Midellwares:
export const startLogin = (email, password) => {

    return async ( dispatch ) => {
        
        const resp = await fetchSinToken('auth', { email, password }, 'POST');
        const data = await resp.json();

        if( data.ok ) {

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( login({
                uid: data.uid,
                name: data.name,
            }))

        } else { 
            Swal.fire('Error', data.msg, 'error');
        }
    }
}

// Actions:
export const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});