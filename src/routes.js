/**
 * Onde fica todas as rotas da aplicação, é utilizado o ROUTER
 * Serve para criar manipuladores de rotas modulares e montáveis é um sistema
 * completo de
 */

import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello caraiooo' })
})

export default routes;