import * as Yup from 'yup';
import { subDays } from 'date-fns';
import { Op } from 'sequelize';
import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController{
  async index(req, res){
    const { id } = req.params;

    const checkin = await Checkin.findAll({
      where: {
        student_id: id,
      },
      order: ['id']
    });

    return res.json(checkin);


  }

  async store(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if(!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: "Validations fails." })
    }

    const { id } = req.params;

    const student = Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: "Student not exist" });
    }

    const checkin = await Checkin.findAll({
      where: {
        student_id: id,
        created_at: {
          [Op.between]: [subDays(new Date(), 7), new Date()],
        },
      },
    });

    if (checkin.length >= 5) {
      return res.status(400).json({ error: 'Only 5 checkins in 7 days' });
    }

    const confirm = await Checkin.create({
      student_id: id,
    });

    return res.json(confirm);

  }
}

export default new CheckinController();
