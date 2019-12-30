import * as Yup from 'yup';
import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';

class HelpOrderController {
  async index(req, res) {
    const listHelpOrders = await HelpOrder.findAll({
      where: {
        student_id: req.params.id
      },
      order:  [['id', 'DESC']],
    });

    return res.json(listHelpOrders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required()
    });

    if(!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails." });
    }

    const { id } = req.params;
    const { question } = req.body;

    const student = await Student.findByPk(id);

    if(!student) {
      return res.status(400).json({ error: "Student not exist." });
    }

    const helpOrder = await HelpOrder.create({
      student_id: id,
      question
    });

    return res.json(helpOrder);

  }
}

export default new HelpOrderController();
