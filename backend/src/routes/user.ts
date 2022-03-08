import { Router } from 'express';
import User from '../controllers/UserController';

const router = Router();

router.post('/register', User.store);
router.post('/login', User.login);

export default router;