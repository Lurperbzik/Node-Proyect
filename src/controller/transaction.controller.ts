import { Request, Response } from 'express';
import { Model } from '../model/transaction';
import { CustomRequest } from  '../middleware/auth';

const model = new Model();

export const buyProduct = ((req: CustomRequest, res: Response) => {

  const product_Id = req.body.id_product || null;
  const user_Id = req.user;
  let cantidad = req.body.cantidad || null;
  
  if(product_Id === null){
    return res.status(404).json("Error en el id del producto");
  }
  if(cantidad === null || cantidad <= 0){
    cantidad = 1;
  }

  try {
    model.buyProduct(user_Id, product_Id, cantidad);
    res.status(200).json("Producto comprado");
  } catch(err){
    res.status(404).json({ err: err });
  }
});


export const getPersonalInventory = ((req: CustomRequest, res: Response) => {

  const user_Id = req.user;
  try {
    model.getPersonalInventory(req.user).then((inventory) => {
      res.status(200).json(inventory);
    });
  } catch (error){
    res.end(error);
  }

});

export const getGeneralInventory = ((req: Request, res: Response) => {
  try {
    model.getGeneralInventory().then((inventory) => {
      res.status(200).json(inventory);
    });
  } catch(error){
    res.end(error);
  }

});