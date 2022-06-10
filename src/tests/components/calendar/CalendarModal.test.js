import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import moment from 'moment';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';

// Action:
import { eventStartUpdated, eventActiveClear, eventStartAddNew } from '../../../actions/events';


// Component:
import CalendarModal from '../../../components/calendar/CalendarModal';


// Helpers:


// Types:
// import { types } from '../../../types/types';


jest.mock('../../../actions/events', ()=> ({
    eventStartUpdated: jest.fn(),
    eventActiveClear: jest.fn(),
    eventStartAddNew: jest.fn()
}));

jest.mock('sweetalert2', ()=> ({
    fire: jest.fn()
}));

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


    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('El modal debe de mostrarse correctamente', () => { 

        expect( wrapper.find('Modal').prop('isOpen') ).toBe(true);


    });

    test('Debe de llamar la acción de actualizar y cerrar el modal', () => { 

        wrapper.find('form').simulate('submit', {
            preventDefault() {}
        });

        expect( eventStartUpdated ).toHaveBeenCalledWith( initialState.calendar.activeEvent );
        expect( eventActiveClear ).toHaveBeenCalled();
    });

    test('Debe de mostrar error si no esta el Titulo', () => {

        wrapper.find('form').simulate('submit', {
            preventDefault() {}
        });

        expect( wrapper.find('input[name="title"]').hasClass('is-invalid') ).toBe(true);

    });

    test('Debe de crear un nuevo evento', () => { 

        const initialState = {
            ui: {
                openModal: true,
            },
            calendar: { 
                events: [],
                activeEvent: null
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

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola Mundo'
            }
        });

        wrapper.find('form').simulate('submit', {
            preventDefault() {}
        });

        expect( eventStartAddNew ).toHaveBeenCalled();
        expect( eventActiveClear ).toHaveBeenCalled();
    });


    test('Debe de validar las fechas', () => { 

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola Mundo'
            }
        });

        const hoy = new Date();

        act(() => {
            wrapper.find('DateTimePicker').at(1).prop('onChange')(hoy);
        });

        wrapper.find('form').simulate('submit', {
            preventDefault() {}
        });

        expect( Swal.fire ).toHaveBeenCalledWith( {"confirmButtonText": "Cool", "icon": "error", "text": "Start date is after end date", "title": "Error!"});

    });

});