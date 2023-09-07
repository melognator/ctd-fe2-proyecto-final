import { setupServer } from 'msw/node';
import { handlers } from './Cita.handlers';

export const server = setupServer(...handlers);