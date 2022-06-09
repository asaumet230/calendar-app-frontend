import '@testing-library/jest-dom';


// Reducer:
import uiReducer from '../../reducers/uiReducers';

// Types:
import { types } from '../../types/types';

const initialState = {
    openModal: false
}

describe('Pruebas en el uiReducer', () => { 


    test('Debe de retornar el estado por defecto', () => {

        const state = uiReducer(initialState, {});
        expect(state).toEqual(initialState);

    });

    test('Debe debe de abrir el modal y cerrar el modal', ()=>{

        const openAction = {
            type: types.uiOpenModal
        }

        const openState = uiReducer(initialState, openAction);
        expect(openState).toEqual({
            openModal: true
        });

        const closeAction = {
            type: types.uiCloseModal
        }

        const closeState = uiReducer(openState, closeAction);
        expect(closeState).toEqual({
            openModal: false
        });
        

    });
 
});