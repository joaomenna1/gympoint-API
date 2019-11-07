/**
 *  Configuração do servidor express por meio de classes
 * 
 */
import express from 'express';
import routes from './routes';

 class App {
   constructor() {
     this.server = express();

     this.middlewares();
     this.routes();
   }

   middlewares() {
      this.server.use(express.json());
   }

   routes() {
      this.server.use(routes);
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
 */