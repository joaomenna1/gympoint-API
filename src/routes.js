import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlansController';
import RegistrationController from './app/controllers/RegistrationController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import AnswerHelpController from './app/controllers/AnswerOrderController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/users', UserController.store);
routes.put('/updateuser', UserController.update);

/* Creating and updating students , your checkins and help */
routes.post('/createStudents', StudentController.store);
routes.put('/updateStudents', StudentController.update);

routes.post('/students/:id/checkins', CheckinController.store);
routes.get('/students/:id/checkins', CheckinController.index);
routes.post('/students/:id/help-orders', HelpOrderController.store);
routes.get('/students/:id/help-orders', HelpOrderController.index);


/* Managing Plans */
routes.post('/createplans', PlanController.store);
routes.get('/listplans', PlanController.index);
routes.put('/updateplans/:id', PlanController.update);
routes.delete('/deleteplans/:id', PlanController.delete);

/* Managing student enrolllments */
routes.post('/registration', RegistrationController.store);
routes.get('/listregistrations', RegistrationController.index);
routes.put('/updateregistrations/:id', RegistrationController.update);
routes.delete('/deleteregistration/:id', RegistrationController.delete);


/* Answering Student */
routes.post('/help-order/:id/answer', AnswerHelpController.store);


export default routes;


/* metodos store, update, index e delete */
