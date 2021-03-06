/* Arquivo ira carregar nosso models e conectar com banco de dados */

import Sequelize from 'sequelize';

import User from '../app/models/User';
import Student from '../app/models/Student';
import Plan from '../app/models/Plan';
import Registration from '../app/models/Registration';
import Checkin from '../app/models/Checkin';
import HelpOrder from '../app/models/HelpOrder';

import dataBaseConfig from '../config/database';

const models = [
  User,
  Student,
  Plan,
  Registration,
  Checkin,
  HelpOrder
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(dataBaseConfig);

    models.map(model => model.init(this.connection));

  }
}

export default new Database();
