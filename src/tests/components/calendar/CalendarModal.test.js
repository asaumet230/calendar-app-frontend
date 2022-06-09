import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import moment from 'moment';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// Action:



// Component:
import CalendarModal from '../../../components/calendar/CalendarModal';


// Helpers:


// Types:
// import { types } from '../../../types/types';


// jest.mock('../../../actions/events', ()=> ({
//     eventSetActive: jest.fn(),
//     startEventLoading: jest.fn(),
// }));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const endDate = now.clone().add(1, 'hours');

const initialState = {
     ui: {
        openModal: true,
    },
    calendar: { 
        events: [],
        activeEvent: {
            title: 'Hola Mundo',
            notas: 'Algunas notas',
            start: now.toDate(),
            end: endDate.toDate()
        }
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
        <CalendarModal />
    </Provider>
);


describe('Pruebas en Componente <CalendarModal />', () => { 

    test('El modal debe de mostrarse correctamente', () => { 

        expect( wrapper.find('Modal').prop('isOpen') ).toBe(true);


    });

    test('Debe de llamar la acción de actualizar y cerrar el modal', () => { 

        


    });

});