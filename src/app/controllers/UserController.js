import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if(!( await schema.isValid(req.body))) {
      return res.status(400).json({ error: "validation fails from yup" })
    }

    const userExist = await User.findOne({ where: { email: req.body.email }});

    if(userExist) {
      return res.status(400).json({ error: "User already exists."});
    }

    const {id, name, email} = await User.create(req.body);

    return res.json({id, name, email, message: "User create success in DB"});

  }

  async update(req, res) {
    const userid = req.userId;
    console.log(`usuario autenticado ->${  userid}`);
  }

}

export default new UserController();
