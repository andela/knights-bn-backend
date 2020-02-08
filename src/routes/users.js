import express from 'express';
import usersController from '../controllers/users';


const router = express.Router();
const { registerUser } = usersController;
router.post('/auth/signup', registerUser);

export default router;
