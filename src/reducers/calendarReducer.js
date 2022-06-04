
// Types:
import { types } from '../types/types';

// {
//     id: new Date().getTime(),
//     title: 'Dia de las madres',
//     start: moment().toDate(),
//     end: moment().add(2, 'hours').toDate(),
//     bgcolor: '#fafafa',
//     user : {
//         _id: '123',
//         name: 'Juan',   
//     }
// }

const initialState = { 
    events: [ ],
    activeEvent: null,
};


const calendarReducer = ( state = initialState, action ) => {

    switch( action.type ) {

        case types.eventSetActive: 
            return {
                ...state,
                activeEvent: action.payload,
            }

        case types.eventActiveClear:
            return {
                ...state,
                activeEvent: null,
            }
        
        case types.eventAddNew:
            return {
                ...state,
                events: [ ...state.events, action.payload ]
            }

        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map( event => ( event.eid === action.payload.eid )? action.payload : event )
            }

        case types.eventDelete:
            return {
                ...state,
                events: state.events.filter( event => event.eid !== state.activeEvent.eid ),
                activeEvent: null,
            }
        
        case types.eventLoaded: 
            return {
                ...state,
                events: [ ...action.payload ],
            } 

        case types.eventLogout:
            return {
                events: [],
                activeEvent: null,
            }
        default:
            return state;
    }
}

export default calendarReducer;