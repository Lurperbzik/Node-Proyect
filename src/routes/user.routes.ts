import { Router } from 'express';
import { verifyRol } from '../middleware/auth';
import * as userController from '../controller/user.controller';

const router = Router();

router.post('/signup', userController.signup);
router.delete('/deleteUser/:email', verifyRol('admin'), userController.deleteUser);
router.patch('/updateUser/:email', verifyRol('admin'), userController.updateUser);
export default router;