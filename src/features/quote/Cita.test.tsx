/*
 * Crear un custom render agregando el provider de Redux para poder disparar las acciones.
 * Utilizar MSW o alguna otra librería para interceptar los request y mockear una respuesta. No se permite mockear el método fetch.
 * Desarrollar test de integración sobre el componente “Quotes”, evaluando los distintos test cases que contemplen los distintos flujos de comportamiento.
 */

import {
    act,
    render,
    screen,
    cleanup,
    findByText,
} from "@testing-library/react";
import { Provider } from "react-redux";
import Cita from "./Cita";
import userEvent from "@testing-library/user-event";
import { server } from "../../tests/server";
import { MENSAJE_CARGANDO } from "./constants";
import { configureStore } from "@reduxjs/toolkit";
import citaReducer from "./citaSlice";

const renderByDefault = () => {
    const store = configureStore({
        reducer: {
            cita: citaReducer,
        },
    });
    render(
        <Provider store={store}>
            <Cita />
        </Provider>
    );
};

beforeAll(() => server.listen());
afterEach(() => {
    cleanup();
    server.resetHandlers();
});
afterAll(() => server.close());

describe("cita tests", () => {
    test("renderize bien", () => {
        renderByDefault();

        const qouteButton = screen.getByText(/Obtener cita aleatoria/i);
        expect(qouteButton).toBeInTheDocument();
        const input = screen.getByPlaceholderText(/Ingresa el nombre del autor/i);
        expect(input).toBeInTheDocument();
        const deleteButton = screen.getByText(/Borrar/i);
        expect(deleteButton).toBeInTheDocument();
    });

    test("que al apretar el botón aparezca el mensaje cargando", async () => {
        renderByDefault();

        const quote = screen.getByText(/No se encontro ninguna cita/i);
        expect(quote).toBeInTheDocument();
        const quoteButton = screen.getByText(/Obtener cita aleatoria/i);
        await userEvent.click(quoteButton);
        expect(quote.textContent).toBe(MENSAJE_CARGANDO);
    });

    test("que se pueda escribir en el input", async () => {
        renderByDefault();

        const input: HTMLInputElement = screen.getByPlaceholderText(
            /Ingresa el nombre del autor/i
        );
        expect(input).toBeInTheDocument();
        const quoteButton = screen.getByText(/Obtener cita aleatoria/i);
        expect(quoteButton).toBeInTheDocument();
        await userEvent.type(input, "test");
        expect(input.value).toBe("test");
        expect(quoteButton).toHaveTextContent(/Obtener/i);
    });

    describe('happy path', () => {
        test('buscar cita "aleatoria"', async () => {
            renderByDefault();
    
            const qouteButton = screen.getByText(/Obtener cita aleatoria/i);
            expect(qouteButton).toBeInTheDocument();
            await userEvent.click(qouteButton);
            const qoute = await screen.findByText(
                /All I'm gonna use this bed for is sleeping, eating and maybe building a little fort./i
            );
            expect(qoute).toBeInTheDocument();
        });
    
        test("buscar una cita por bart", async () => {
            renderByDefault();
    
            const input: HTMLInputElement = screen.getByPlaceholderText(
                /Ingresa el nombre del autor/i
            );
            const quoteButton = screen.getByText(/Obtener cita aleatoria/i);
            await userEvent.type(input, "bart");
            await userEvent.click(quoteButton);
            const authorText = await screen.findByText(/Bart Simpson/i);
            expect(authorText).toBeInTheDocument();
        });
    })

    describe('unhappy path', () => {
        test('que al apretar el botón con un número en el input salga mensaje de error', async () => {
            renderByDefault();
    
            const input: HTMLInputElement = screen.getByPlaceholderText(
                /Ingresa el nombre del autor/i
            );
            const quoteButton = screen.getByText(/Obtener cita aleatoria/i);
            await userEvent.type(input, "123");
            await userEvent.click(quoteButton);
            const qoute = await screen.findByText(
                /Por favor ingrese un nombre válido/i
            );
            expect(qoute).toBeInTheDocument();
        });
    
        test("buscar un personaje que no existe", async () => {
            renderByDefault();
    
            const input: HTMLInputElement = screen.getByPlaceholderText(
                /Ingresa el nombre del autor/i
            );
            const quoteButton = screen.getByText(/Obtener cita aleatoria/i);
            await userEvent.type(input, "asdasdassadas");
            await userEvent.click(quoteButton);
            const errorText = await screen.findByText(
                /Por favor ingrese un nombre válido/i
            );
            expect(errorText).toBeInTheDocument();
        });
    })

});
