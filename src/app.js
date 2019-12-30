/**
 *  Configuração do servidor express por meio de classes
 *
 */
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';

import routes from './routes';

import * as Sentry from '@sentry/node';
import Youch from 'youch';
import sentryConfig from './config/sentry';

import './database';

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.execptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  execptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }
      return res.status(500).json({ error: "Internal server error" });
    });
  }
}

export default new App().server;

/**
 *  Toda vez que a class for chamada, o metodo constructor() é  chamado automaticamente
 *  junto com todos os metodos referenciados dentro do contructor().
 *
 *  Middlewares() onde irar cadastrar todos os middlewares
 *  Linha 14 : Aplicação ja esta pronta a receber  informações no no formato JSON
 *
 * Youch para tratativa de error
 *
 */
