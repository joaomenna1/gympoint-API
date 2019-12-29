import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlansController';
import RegistrationController from './app/controllers/RegistrationController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/updateuser', UserController.update);

routes.post('/createStudents', StudentController.store);
routes.put('/updateStudents', StudentController.update);

routes.post('/createplans', PlanController.store);
routes.get('/listplans', PlanController.index);
routes.put('/updateplans/:id', PlanController.update);
routes.delete('/deleteplans/:id', PlanController.delete);

routes.post('/registration', RegistrationController.store);
routes.get('/listregistrations', RegistrationController.index);
routes.put('/updateregistrations/:id', RegistrationController.update);
routes.delete('/deleteregistration/:id', RegistrationController.delete);

export default routes;


/* metodos store, update, index e delete */
