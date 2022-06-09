import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';


// Component:
import AppRouter from '../../router/AppRouter';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);



describe('Pruebas en el componente <AppRouter />', () => { 

    test('El componente debe de mostrarse correctamente', () => { 

        const initialState = {
            auth: {
                checking: true,
            }
        };

        const store = mockStore( initialState );
     

        const wrapper = mount(
            <Provider store={ store }>
                <MemoryRouter>
                    <AppRouter />
                </MemoryRouter>
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();

    });

    test('Debe de mostrar la ruta publica', () => {

          const initialState = {
            auth: {
                checking: false,
                uid: null,
            }
        };

        const store = mockStore( initialState );
     
        const wrapper = mount(
            <Provider store={ store }>
                <MemoryRouter>
                    <AppRouter />
                </MemoryRouter>
            </Provider>
        );

        expect( wrapper ).toMatchSnapshot();
        expect(wrapper.exists('.login-container')).toBe(true);


    });

     test('Debe de mostrar la ruta privada', () => {

        const initialState = {
            ui: {
                modalOpen: false,
            },
            calendar: { 
                events: [],
            },
            auth: {
                checking: false,
                uid: '123',
                name: 'Andres'
            }
        };

        const store = mockStore( initialState );
     
        const wrapper = mount(
            <Provider store={ store }>
                <MemoryRouter>
                    <AppRouter />
                </MemoryRouter>
            </Provider>
        );

        expect( wrapper ).toMatchSnapshot();
        expect(wrapper.exists('.calendar-screen')).toBe(true);


    });

});