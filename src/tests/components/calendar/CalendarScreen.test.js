import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// Action:
import { eventSetActive } from '../../../actions/events';

// Component:
import CalendarScreen from '../../../components/calendar/CalendarScreen';

// Helpers:
import { messages } from '../../../helpers/calendar-messages-es';

// Types:
import { types } from '../../../types/types';


jest.mock('../../../actions/events', ()=> ({
    eventSetActive: jest.fn(),
    startEventLoading: jest.fn(),
}))

Storage.prototype.setItem = jest.fn();

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

    test('Pruebas con las interacciones del calendario', () => {

        const calendar = wrapper.find('Calendar');
        const calendarMessages = calendar.prop('messages');
        expect( calendarMessages ).toEqual( messages );

        calendar.prop('onDoubleClickEvent')();
        expect( store.dispatch ).toHaveBeenCalledWith({ type: types.uiOpenModal });

        calendar.prop('onSelectEvent')({ start: 'Hola' });
        expect( eventSetActive ).toHaveBeenCalledWith( { start: 'Hola' } );


        act(() => {
            calendar.prop('onView')('week');
            expect( localStorage.setItem ).toHaveBeenCalledWith('lastView', 'week');
        })
        
    });


});