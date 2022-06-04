import Swal from "sweetalert2";

// Types:
import { types } from "../types/types";

// Helpers:
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";


// Middlewares:

export const eventStartAddNew = ( event ) => {

    return async ( dispatch, getState ) => {
        
        const { uid, name } = getState().auth;

        try {
            const resp =  await fetchConToken('events', event, 'POST');
            const data = await resp.json();
            const { eid } = data.evento;
    
            if( data.ok ) {

                event.id = eid;
                event.user = {
                    _id: uid,
                    name
                }
    
                dispatch( eventAddNew( event ));
    
            } 
            
        } catch (error) {
            console.log(error);
            Swal.fire('Error', error.msg, 'error');
        }
    }
}

export const startEventLoading = () => {

    return async ( dispatch ) => {

        try {

            const resp = await fetchConToken('events', null, 'GET');
            const data = await resp.json();
            const eventos = prepareEvents( data.eventos );
            dispatch( eventLoaded( eventos ));
            
        } catch (error) {

            console.log(error);
            Swal.fire('Error', error.msg, 'error');

        }
    }
}

export const eventStartUpdated = ( event ) => { 

    return async ( dispatch ) => {

        try {

            const resp = await fetchConToken(`events/${ event.eid }`, event, 'PUT');
            const data = await resp.json();

            if( data.ok ) {

                dispatch( eventUpdated( event ));

            } else {

                Swal.fire('Error', data.msg, 'error');

            }

        } catch (error) {

            console.log(error);
            Swal.fire('Error', error.msg, 'error');
            
        }
    }
}


export const eventStartDelete = ( ) => { 

     return async ( dispatch, getState ) => {

        const { activeEvent } = getState().calendar;
        const { eid, id } = activeEvent;

        try {

            const resp = await fetchConToken(`events/${ eid || id } `,{}, 'DELETE');
            const data = await resp.json();

            if( data.ok ) {

                dispatch( eventDelete( ));

            } else {

                Swal.fire('Error', data.msg, 'error');

            }

        } catch (error) {

            console.log(error);
            Swal.fire('Error', error.msg, 'error');
            
        }
    }
}

// Actions:

export const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event,
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event,
});

export const eventActiveClear = () => ({
    type: types.eventActiveClear,
});

export const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event,

});

export const eventDelete = () => ({
    type: types.eventDelete,
});

export const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events,
});

export const eventLogout = ()=> ({
    type: types.eventLogout,
})