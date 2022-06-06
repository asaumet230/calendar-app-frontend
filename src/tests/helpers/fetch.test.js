import '@testing-library/jest-dom';

// Helpers:
import { fetchConToken, fetchSinToken } from '../../helpers/fetch';

describe('Pruebas en helper fetch', () => { 

    let token = '';

    test('FetchSinToken debe de mostrar la información correcta', async () => { 

        const email = 'test1@test.com';
        const password = '123456';

        const resp = await fetchSinToken('auth', { email, password }, 'POST' );
        expect( resp instanceof Response ).toBe( true );

        const body = await resp.json();
        expect( body.ok ).toBe( true );

        token = body.token;

    });

    test('FetchConToken debe de mostrar la información correcta', async () => {

        localStorage.setItem('token', token);

        const resp = await fetchConToken('events', {}, 'GET');
        expect( resp instanceof Response ).toBe( true );

        const body = await resp.json();
        expect( body.ok ).toBe( true );

    });
 });