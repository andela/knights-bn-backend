/**
 * @swagger
 *  "/auth/signup": {
      "post": {
        "description": "Users once registered via the registration endpoint, should receive a JWT to be required on all subsequent calls to all other endpoints that require authentication.",
        "summary": "Signup",
        "tags": [
          "User"
        ],
        "operationId": "Signup",
        "deprecated": false,
        "produces": [
          "application/json"
        ],
        "consumes": [
          "application/x-www-form-urlencoded"
        ],
        "parameters": [
          {
            "name": "firstName",
            "in": "formData",
            "required": true,
            "type": "string",
            "description": ""
          },
          {
            "name": "lastName",
            "in": "formData",
            "required": true,
            "type": "string",
            "description": ""
          },
          {
            "name": "PassportNumber",
            "in": "formData",
            "required": true,
            "type": "integer",
            "format": "int64",
            "description": ""
          },
          {
            "name": "email",
            "in": "formData",
            "required": true,
            "type": "string",
            "description": ""
          },
          {
            "name": "password",
            "in": "formData",
            "required": true,
            "type": "string",
            "description": ""
          },
          {
            "name": "gender",
            "in": "formData",
            "required": true,
            "type": "string",
            "description": ""
          }
        ],
        "responses": {
          "201": {
            "description": "",
            "headers": {}
          }
        }
      }
    }
 */


import express from 'express';
import passport from 'passport';
import usersController from '../controllers/users';
import passportConfig from '../config/passport';
import fakeAuth from '../middlewares/fakeAuth';

const router = express.Router();
const { registerUser, socialLogin } = usersController;

router.post('/auth/signup', registerUser);

router.get('/auth/login/socialLogin', (req, res) => {
  res.sendFile('page.html', { root: `${__dirname}/../` });
});
router.get('/auth/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/login/google/redirect', passport.authenticate('google'), socialLogin);

router.get('/auth/login/facebook', passport.authenticate('facebook'));
router.get('/auth/login/facebook/redirect', passport.authenticate('facebook'), socialLogin);

// test authorization
router.get('/auth/test/google', fakeAuth, socialLogin);
router.get('/auth/test/facebook', fakeAuth, socialLogin);

export default router;
