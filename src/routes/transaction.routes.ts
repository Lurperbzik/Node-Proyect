import { Router } from 'express';
import * as transactionController from '../controller/transaction.controller';
import { authenticate, verifyRol } from '../middleware/auth';
const router = Router();

router.post('/buyProduct', authenticate, transactionController.buyProduct);
router.get('/personalInventory', authenticate, transactionController.getPersonalInventory);
router.get('/generalInventory', verifyRol('admin'),  transactionController.getGeneralInventory);

export default router;