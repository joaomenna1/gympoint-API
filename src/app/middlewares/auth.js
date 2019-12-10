/* verificação se o usuario esta logado */
/* é sempre um função */
/* O token fica localizado no req.headers.authorization  e
    vem como retorno [ bearer 'y0342nvsd832483247032'] */
/* o promissify pega uma função e transforma em asycn e await (Assincrona)
   Nesse caso é para utilizar o verify pois é uma função sincrona
*/
/* req.userId possui o id de usuario que ja foi autenticado, isso serve para outras rotas */

import jwt from 'jsonwebtoken';

import { promisify } from 'util';
import authConfig from '../../config/auth';

export default  async(req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [,token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  }catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }

};


