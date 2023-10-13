import { Router } from 'express';
import * as productsController from '../controller/products.controller';
import { verifyRol } from '../middleware/auth';
const router = Router();

router.get('/getProducts', productsController.getProducts);
router.get('/getProductById/:id', productsController.getProductById);
router.patch('/updateProductById/:id', verifyRol('admin'), productsController.updateProductById);
router.post('/createProduct', verifyRol('admin'), productsController.createProduct);
router.delete('/deleteProductById/:id', verifyRol('admin'), productsController.deleteProductById);

export default router;