import '@testing-library/jest-dom';

import consfigureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// Actions:
import { startLogin } from '../../actions/auth';
import { types } from '../../types/types';


const middlewares = [thunk];
const mockStore = consfigureStore(middlewares);

const initialState = {};
Storage.prototype.setItem = jest.fn();

describe('Pruebas en el auth', () => { 

    let store = mockStore(initialState);
    

    beforeEach( () => {
        store = mockStore(initialState);
        jest.clearAllMocks();
    } );

    test('startLogin se debe de funcionar correctamente', async () => {

        await store.dispatch( startLogin( 'test1@test.com', '123456' ) );

        const actions = store.getActions();
       
        expect( actions[0] ).toEqual( {
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String),
            }
        } );

        expect( localStorage.setItem ).toHaveBeenCalledWith( 'token', expect.any(String) );
        expect( localStorage.setItem ).toHaveBeenCalledWith( 'token-init-date', expect.any(Number) );


    });

    
});