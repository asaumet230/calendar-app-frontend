import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// Component:
import LoginScreen from '../../../components/auth/LoginScreen';

// Actions:
// import { startLogin, startRegister } from '../../../actions/auth';

// Helpers:
import { loginFormValid } from '../../../helpers/loginFormValid';
import { registerFormValid } from '../../../helpers/registerFormValid';
 

jest.mock('../../../actions/auth', () => ({
    startLogin: jest.fn(),
}));

jest.mock('../../../actions/auth', () => ({
    startRegister: jest.fn(),
}))

jest.mock('../../../helpers/loginFormValid');
jest.mock('../../../helpers/registerFormValid');



const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
    auth: {
        checking: true,
    }
};
    
const store = mockStore( initialState );
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <MemoryRouter>
            <LoginScreen />
        </MemoryRouter>
    </Provider>
);


describe('Pruebas en el componente <loginScreen />', () => { 

    beforeEach( ()=> {
        jest.clearAllMocks()
    })


    test('Debe de mostrarse correctamente', () => { 
        
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe de llamar dispatch con la acción startLogin', () => {

        wrapper.find('input[name="loginEmail"]').simulate('change', {
            target: {
                name: 'loginEmail',
                value: 'test1@test.com',
            }
        } );

        wrapper.find('input[name="loginpassword"]').simulate('change', {
            target: {
                name: 'loginpassword',
                value: '123456',
            }
        } );

        wrapper.find('form').at(0).prop('onSubmit')({
            preventDefault: () => {}
        });

        expect( loginFormValid ).toHaveBeenCalled();
        
    });

    test('Si no pasa la validación no debe de pasar a la acción startRegister', () => { 


        wrapper.find('input[name="registerName"]').simulate('change', {
            target: {
                name: 'registerName',
                value: 'test10',
            }
        });

        wrapper.find('input[name="registerEmail"]').simulate('change', {
            target: {
                name: 'registerEmail',
                value: 'test10@test.com',
            }
        });

        wrapper.find('input[name="registerPassword"]').simulate('change', {
            target: {
                name: 'registerPassword',
                value: '123456',
            }
        });

        wrapper.find('input[name="registerPassword2"]').simulate('change', {
            target: {
                name: 'registerPassword2',
                value: '123456',
            }
        });


        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault: () => {}
        });

        expect( registerFormValid ).toHaveBeenCalled();
       
     
    });
});