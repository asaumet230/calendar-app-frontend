import { types } from "../types/types";
import Swal from "sweetalert2";

// Helpers:
import { fetchConToken, fetchSinToken } from "../helpers/fetch"

// Actions:
import { eventLogout } from "./events";


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

export const startRegister = ( name, email, password ) => {
    
    return async ( dispatch ) => {
            
        const resp = await fetchSinToken('users/new', { name, email, password }, 'POST');
        const data = await resp.json();
        console.log(data);

        if( data.ok ) {
                
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( login({ 
                uid: data.uid,
                name: data.name,
            }));

        } else { 
            Swal.fire('Error', data.msg, 'error');
        }
    }
}

export const startCheking = () => { 
    
    return async ( dispatch ) => {
   
        const resp = await fetchConToken('auth/renew', {}, 'GET');
        const data = await resp.json();
        
        if( data.ok ) {
                
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( login({ 
                uid: data.uid,
                name: data.name,
            }));

        } else { 
            dispatch( checkingFinish() );
        }
    }
}

export const startLogout = () => { 

    return async ( dispatch ) => {
            
        localStorage.clear();
        dispatch( eventLogout() );
        dispatch( logout() );
    }
}



// Actions:
export const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});

export const logout = () => ({
    type: types.authLogout
});

export const checkingFinish = () => ({
    type: types.authChekingFinish
});