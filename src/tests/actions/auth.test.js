import '@testing-library/jest-dom';

import consfigureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';

// Actions:
import { startCheking, startLogin, startRegister } from '../../actions/auth';
import { types } from '../../types/types';

// Helpers:
import * as fetchModule from '../../helpers/fetch';


jest.mock('sweetalert2', ()=> ({
    fire: jest.fn()
}));

Storage.prototype.setItem = jest.fn();

const middlewares = [thunk];
const mockStore = consfigureStore(middlewares);

const initialState = {};

let token = '';

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

        token = localStorage.setItem.mock.calls[0][1];

    });

    test('startLogin Incorrecto', async () => { 

        let data = {
            msg: 'Password o email incorrectos'
        };

        await store.dispatch( startLogin('test1@test.com', '1234') );
        let actions = store.getActions();

        expect( actions ).toEqual([]); 
        expect( Swal.fire ).toHaveBeenLastCalledWith( 'Error', data.msg, 'error' );

        data = {
            msg: 'El usuario no existe'
        };

        await store.dispatch( startLogin('test1@test.co', '1234') );
        actions = store.getActions();

        expect( Swal.fire ).toHaveBeenLastCalledWith( 'Error', data.msg, 'error' );
     
    });


    test('startRegister se debe de funcionar correctamente', async () => {

        
        fetchModule.fetchSinToken = jest.fn( ()=> ({

            json() {

                return {
                    ok: true,
                    msg: 'Usuario creado exitosamente',
                    uid: '629536383a3a0aba61c3cbd8',
                    name: 'test8',
                    token
                }
            }

        }));

        await store.dispatch( startRegister( 'test8', 'test8@test.com', '123456') );

        const actions = store.getActions();

        expect( actions[0] ).toEqual( {
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String),
            }
        });

        expect( localStorage.setItem ).toHaveBeenCalledWith( 'token', expect.any(String) );
        expect( localStorage.setItem ).toHaveBeenCalledWith( 'token-init-date', expect.any(Number) );
    });


    test('startCheking debe ejecutarse correctamente', async () => {

        fetchModule.fetchConToken = jest.fn( ()=> ({

            json() {

                return {
                    ok: true,
                    msg: 'Token renovado exitosamente',
                    uid: '629536383a3a0aba61c3cbd8',
                    name: 'test8',
                    token
                }
            }

        }));


        await store.dispatch( startCheking() );
        const actions = store.getActions();

        expect( actions[0] ).toEqual( {
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String),
            }
        });

        expect( localStorage.setItem ).toHaveBeenCalledWith( 'token', expect.any(String) );
        expect( localStorage.setItem ).toHaveBeenCalledWith( 'token-init-date', expect.any(Number) );
    });
    


});