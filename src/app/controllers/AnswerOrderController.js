import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';

import AnswerMail from '../jobs/AnswerMail';
import Queue from '../../lib/Queue'


class AnswerOrderController {
  async store(req, res){
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if(!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails." });
    }

    const { id } = req.params;
    const { answer } = req.body;

    const help_order = await HelpOrder.findByPk(id);

    if(!help_order) {
      return res.status(400).json({ error: "Help Order not exist."});
    }

    if(help_order.answer !== null) {
      return res
        .status(400)
        .json({ error: 'Help Order has already been answered.' });
    }

    const confirm = await help_order.update({ answer, answer_at: new Date() });

    await Queue.add(AnswerMail.key, {
      help_order,
      confirm,
    });

    return res.json(confirm);
  }
}

export default new AnswerOrderController();
