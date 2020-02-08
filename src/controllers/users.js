import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import environment from 'dotenv';
import models from '../db/models';

environment.config();

export default class usersController {
  static async registerUser(req, res) {
    try {
      const {
        firstName, lastName, gender, PassportNumber, email, password, confirm,
      } = req.body;
      if (password === confirm) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await models.User.create({
          firstName, lastName, gender, email, password: hashedPassword, Passport: PassportNumber,
        });
        const token = jwt.sign({ userId: newUser.id, email: newUser.email }, process.env.secretkey);
        res.status(201).json({ message: 'user successfully created', token });
      } else {
        res.status(401).json({ error: 'Confirmation password did not match' });
      }
    } catch (error) {
      res.status(400).json({ message: 'Please check your request parameter' });
    }
  }
}
