import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      weight: Yup.string().required(),
      height: Yup.string().required(),
      age: Yup.string().required(),
    });

    if(!( await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validations fails" });
    }

    const studentExist = await Student.findOne({
      where: { email: req.body.email }
    });

    if(studentExist) {
      return res.status(400).json({ error: "The student already exists" });
    }

    const { name, email, age , weight, height } = await Student.create(req.body);

    return res.json({
      name,
      email,
      age,
      weight,
      height,
      message: "create success one student",
    });

  }

  async update(req, res) {

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email().required(),
      weight: Yup.string(),
      height: Yup.string(),
      age: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.json(400).json({ error: 'Preencha corretamente o campo.' });
    }
    const { email } = req.body;

    const studentExist = await Student.findOne({ where: { email } });

    if(!studentExist) {
      return res.status(401).json({ error: "Student not found" });
    }
    const { id } = studentExist;

    const { name } = Student.update(
      {
        weight: req.body.weight,
        height: req.body.height,
        age: req.body.age,
        name: req.body.name,
      },
      { where: { email } }
    );

    return res.json({
      id,
      name,
      message: 'student successfully updated'
    });

  }

}

export default new StudentController();


/*
  Como faço para criar um rota de add estudantes?

  1 - verifico se o usuario esta autenticado no sistema
  2 - nao pode criar estudante duas vezes
  3 - model create

  Como faço para criar um rota update de estudantes?

  1 - verifico se esta autenticado no sistema
  2 - Permitir editar 1 ou varios campos
  3 - qual o usuario irá editar
  4 - model student update



*/
