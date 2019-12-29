import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlansController {
  async index(req, res) {
    const listPlans = await Plan.findAll({
      order: ['id'],
      attributes: ['id','title','duration','price'],
      limit: 20
    });

    return res.json(listPlans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if(!( await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const planExist = await Plan.findOne({ where: {
      title: req.body.title,
      duration: req.body.duration,
      price: req.body.price,
     }
    });

    if(planExist) {
      return res.status(400).json({ error: "Plan already exist." });
    }

    const { title, duration, price } = await Plan.create(req.body);

    return res.json({
      title,
      duration,
      price,
      message: "Plan was created."
    })
  }

  async update(req, res) {

    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if(!( await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const plan = await Plan.findByPk(req.params.id);

    if(!plan) {
      return res.status(400).json({ error: "Plan not exist." });
    }

    const planExist = await Plan.findOne({
      where: {
        title: req.body.title,
        duration: req.body.duration,
        price: req.body.price,
      },
    });

    if(planExist) {
      return res.status(400).json({ error: "Plan already exist." });
    }

    const { title, duration, price } = await plan.update(req.body);

    return res.json({
      title,
      duration,
      price,
    });
  }

  async delete(req, res) {
    Plan.destroy({
      where: { 'id': req.params.id }
    }).then(() => res.json({ message: "removed." })
    ).catch((err) => res.json({ error: "fails in methods remove" }))
  }
}

export default new PlansController();
