import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Student extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      age: Sequelize.INTEGER,
      weight: Sequelize.FLOAT,
      height: Sequelize.FLOAT,
    },
    {
      sequelize,
    });

    return this;
  }
  /* metodos de corno */
  checkName(name) {
    return bcrypt.compare(name, this.name);
  }

  checkEmail(email) {
    return bcrypt.compare(email, this.email);
  }

  checkAge(age) {
    return bcrypt.compare(age, this.age);
  }

  checkWeight(weight) {
    return bcrypt.compare(weight, this.weight);
  }

  checkHeight(height) {
    return bcrypt.compare(height, this.height);
  }

}

export default Student;
