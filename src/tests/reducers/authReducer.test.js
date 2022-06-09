import '@testing-library/jest-dom';


// Reducer:
import authReducer from '../../reducers/authReducer';

// Types:
import { types } from '../../types/types';

const initialState = {
    checking: false,
    uid: null,
    name: null,
}

describe('Pruebas en el authReducer', () => { 


    test('Debe de retornar el estado por defecto', () => { 

        const state = authReducer(initialState, {});
        expect(state).toEqual(initialState);

    });

    test('Debe de realizar el login y logout', ()=> {

        const loginAction = {
            type: types.authLogin,
            payload: {
                uid: 'ABC123',
                name: 'Juan',
            }
        }

        const loginState = authReducer(initialState, loginAction);
        expect(loginState).toEqual({ checking: false, uid: 'ABC123', name: 'Juan' });

        const logoutAction = {
            type: types.authLogout,
        }

        const logoutState = authReducer(loginState, logoutAction);
        expect(logoutState).toEqual({ checking: false });

    });

    test('Debe de terminar la verificación de la autenticación si el token no es valido', ()=> {

        const checkingAction = {
            type: types.authChekingFinish,
        }


        const checkingState = authReducer(initialState, checkingAction);
        expect(checkingState).toEqual({ checking: false, uid: null, name: null });


    });
});