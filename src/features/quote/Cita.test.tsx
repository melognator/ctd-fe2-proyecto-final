/*
* Crear un custom render agregando el provider de Redux para poder disparar las acciones.
* Utilizar MSW o alguna otra librería para interceptar los request y mockear una respuesta. No se permite mockear el método fetch.
* Desarrollar test de integración sobre el componente “Quotes”, evaluando los distintos test cases que contemplen los distintos flujos de comportamiento.
*/

import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import Cita from './Cita';
import { userEvent } from '@testing-library/user-event/dist/types/setup';

describe('Cita', () => {

    beforeEach(() => {
        render(
            <Provider store={store}>
                <Cita />
            </Provider>
        );
    });

    test('que renderize bien', () => {
        const qouteButton = screen.getByText(/Obtener cita aleatoria/i);
        expect(qouteButton).toBeInTheDocument();
        const input = screen.getByPlaceholderText(/Ingresa el nombre del autor/i);
        expect(input).toBeInTheDocument();
        const deleteButton = screen.getByText(/Borrar/i);
        expect(deleteButton).toBeInTheDocument();
    });

    test('que el botón funcione', () => {
        const qoute = screen.getByText(/No se encontro ninguna cita/i);
        expect(qoute).toBeInTheDocument();
        const qouteButton = screen.getByText(/Obtener cita aleatoria/i);
        act(() => {
            qouteButton.click();
        });            
        expect(qoute).not.toHaveTextContent(/No se encontro ninguna cita/i);
    });

    test('que el input funcione', () => {
        const input: HTMLInputElement = screen.getByPlaceholderText(/Ingresa el nombre del autor/i);
        expect(input).toBeInTheDocument();
        const quoteButton = screen.getByText(/Obtener cita aleatoria/i);
        expect(quoteButton).toBeInTheDocument();
        userEvent.type(input, 'test');
        expect(input.value).toBe('test');
        expect(quoteButton).toHaveTextContent(/Obtener/i);
    });

    test('que al apretar el botón con un número en el input salga mensaje de error', async() => {
        const input: HTMLInputElement = screen.getByPlaceholderText(/Ingresa el nombre del autor/i);
        expect(input).toBeInTheDocument();
        const quoteButton = screen.getByText(/Obtener cita aleatoria/i);
        expect(quoteButton).toBeInTheDocument();
        userEvent.type(input, '123');
        expect(input.value).toBe('123');
        expect(quoteButton).toHaveTextContent(/Obtener/i);
        act(() => {
            quoteButton.click();
        });
        const qoute = await screen.findByText(/Por favor ingrese un nombre válido/i,{},{timeout: 5000});
        expect(qoute).toBeInTheDocument();        
    });

    test('buscar una cita por bart', async() => {
        const input: HTMLInputElement = screen.getByPlaceholderText(/Ingresa el nombre del autor/i);
        expect(input).toBeInTheDocument();
        const quoteButton = screen.getByText(/Obtener cita aleatoria/i);
        expect(quoteButton).toBeInTheDocument();
        userEvent.type(input, 'bart');
        expect(input.value).toBe('bart');
        expect(quoteButton).toHaveTextContent(/Obtener/i);
        act(() => {
            quoteButton.click();
        });
        const authorText = await screen.findByText(/Bart Simpson/i,{},{timeout: 5000});
        expect(authorText).toBeInTheDocument();

    });
});