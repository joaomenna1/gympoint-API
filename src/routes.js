/**
 * Onde fica todas as rotas da aplicação, é utilizado o ROUTER
 * Serve para criar manipuladores de rotas modulares e montáveis é um sistema
 * completo de
 */

import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/updateuser', UserController.update);

routes.post('/createStudents', StudentController.store);
routes.put('/updateStudents', StudentController.update);

export default routes;
