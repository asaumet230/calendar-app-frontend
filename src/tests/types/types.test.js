import '@testing-library/jest-dom';

import { types } from '../../types/types';


describe('Pruebas en el objeto de Types', () => {

    test('Comprobando que el objeto Types este correcto', () => { 

        expect( types ).toEqual({

            uiOpenModal: '[ui] Open modal',
            uiCloseModal: '[ui] Close modal',

            eventSetActive: '[event] Set active',
            eventStartAddNew: '[event] Start add new',
            eventAddNew: '[event] Add new',
            eventUpdated: '[event] Event updated',
            eventActiveClear: '[event] Active clear',
            eventDelete: '[event] Delete event',
            eventLoaded: '[event] Loaded events',
            eventLogout: '[event] Logout',

            authChekingFinish: '[auth] Finish cheking login state',
            authStartLogin: '[auth] Start login',
            authLogin: '[auth] Login',
            authStartRegister: '[auth] Start register',
            authStartTokenRenew: '[auth] Start token renew',
            authLogout: '[auth] Logout',

        })

    });


});