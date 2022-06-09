import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// Action:


// Component:
import CalendarScreen from '../../../components/calendar/CalendarScreen';



const middlewares = [thunk];
const mockStore = configureStore(middlewares);
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
const store = mockStore(initialState);
store.dispatch = jest.fn(); // Solo verifico que se ejecuta la funcion dispatch con la acción.



const wrapper = mount(
    <Provider store={ store }>
        <CalendarScreen />
    </Provider>
);


describe('Pruebas componente <CalendarScreen />', () => { 

    test('Debe de mostrarse correctamente el componente', () => { 

        expect( wrapper ).toMatchSnapshot();

    });


});