import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import environment from 'dotenv';
import models from '../db/models';
import generateToken from '../utils/generateToken';
import generatePswd from '../utils/randomPswd';

environment.config();

export default class usersController {
  static async registerUser(req, res) {
    try {
      const {
        firstName, lastName, gender, passportNumber, email, password,
      } = req.body;

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await models.User.create({
        firstName, lastName, gender, email, password: hashedPassword, passport: passportNumber,
      });
      const token = jwt.sign({
        userId: newUser.id, email: newUser.email, firstName, lastName,
      }, process.env.SECRETKEY);
      res.status(201).json({ message: 'user successfully created', token });
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  static async socialLogin(req, res) {
    try {
      const { User } = models;
      const {
        firstName, lastName, gender, email, method,
      } = req.user;
      await User.findOrCreate({
        where: { email },
        defaults: {
          firstName, lastName, gender, email, password: generatePswd(),
        },
        raw: true,
      })
        .spread((user, created) => {
          if (user) {
            const token = generateToken({
              userId: user.id,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
            });
            const statusCode = (created === true) ? 201 : 200;
            res.json({
              status: statusCode,
              message: 'successfully logged in !',
              method,
              firstName,
              lastName,
              email,
              token,
            });
          }
        });
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  }
}
