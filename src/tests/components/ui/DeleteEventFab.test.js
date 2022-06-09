import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// Action:
import { eventStartDelete } from '../../../actions/events';

// Component:
import DeleteEventFab from '../../../components/ui/DeleteEventFab';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};
const store = mockStore(initialState);
store.dispatch = jest.fn(); // Solo verifico que se ejecuta la funcion dispatch con la acción.

jest.mock('../../../actions/events', () => ({
    eventStartDelete: jest.fn(),
}))

const wrapper = mount(
    <Provider store={ store }>
        <DeleteEventFab />
    </Provider>
);
describe('Pruebas componente <DeleteEventFab />', () => { 

    test('El componente debe de mostrarse correctamente', () => { 

        expect(wrapper).toMatchSnapshot();

    });

    test('Debe de llamar el eventStartDelete al hacr click', () => {

        wrapper.find('button').simulate('click');
        expect( store.dispatch ).toHaveBeenCalledWith( eventStartDelete() );
        
    });

});