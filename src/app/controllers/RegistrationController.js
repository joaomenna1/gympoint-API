import * as Yup from 'yup';
import { parseISO, addMonths, format } from 'date-fns';


import Registration from '../models/Registration';
import Student from '../models/Student';
import Plan from '../models/Plan';

import WelcomeMail from '../jobs/WelcomeMail';
import Queue from '../../lib/Queue';

class RegistrationController {
  async index(req, res) {
    const listRegisters = await Registration.findAll({
      order: ['id'],
      attributes: ['student_id', 'plan_id','start_date', 'end_date','price']
    });

    return res.json(listRegisters);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if( !(await schema.isValid(req.body)) ) {
      return res.status(400).json({ error: "Validations fails" });
    }

    const { student_id, plan_id, start_date } = req.body;


    const student = await Student.findByPk(student_id);

    if (!student) {
      return res
      .status(401)
      .json({ error: "You can only create active enrollment wich students" });
    }

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res
        .status(401)
        .json({ error: "You can only create active enrollment witch a plan" });
    }


    const RegistrationExist = await Registration.findOne({
      where: {
        student_id: req.body.student_id,
        plan_id: req.body.plan_id,
      }
    });


    if(RegistrationExist) {
      return res.status(400).json({ error: "Registration already exist" });
    }

    const aux = parseISO(start_date);

    const end_date = addMonths(aux, plan.duration);

    const price = plan.price * plan.duration;


    const registration = await Registration.create({
       student_id,
       plan_id,
       start_date: aux,
       end_date,
       price
    });

   await Queue.add(WelcomeMail.key, {
      registration,
      student,
      plan,
    });

    return res.json(registration);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if( !(await schema.isValid(req.body)) ) {
      return res.status(400).json({ error: "Validations fails" });
    }

    const registration = await Registration.findByPk(req.params.id);

    if (!registration) {
      return res.status(400).json( { error: "Registration not exist." });
    }

    const { student_id, plan_id, start_date } = req.body;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: "Student not exist" });
    }

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(400).json({ error: "Plan not exist" });
    }

    const registrationAlreadyExist = await Registration.findOne({
      where: {
        student_id: req.body.student_id,
        plan_id: req.body.plan_id,
      }
    });

    if (registrationAlreadyExist) {
      return res.status(400).json({ error: "This registration already exist." });
    }

    const aux = parseISO(start_date);

    const end_date = addMonths(aux, plan.duration);

    const price = plan.duration * plan.price;

    registration.update({
      student_id,
      plan_id,
      start_date,
      end_date,
      price
    });

    return res.json(registration);

  }

  async delete(req, res) {

    Registration.destroy({
      where: { 'id': req.params.id }
    }).then( () => res.json({ message: "removed registration." })
    ).catch( ( err ) => res.json({ error: "fails in methods removed" }))
  }


}

export default new RegistrationController();
