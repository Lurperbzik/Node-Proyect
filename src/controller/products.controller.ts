import { Request, Response } from 'express';
import { Model } from '../model/product';

const model = new Model();

export const getProducts = (req: Request, res: Response) => {
  model.getProducts().then((products) => {
    res.json(products);
  }).catch((err) => {
    res.status(204).end('No hay ningun producto en el stock');
  });
}

export const getProductById = (req: Request, res: Response) => {
  const id = req.params.productId || null;

  if (id === null) {
    res.status(404).json("Error en el id del producto");
  }
  model.getProductById(id).then((product) => {
    res.json(product);
  }).catch((err) => {
    res.status(204).end(err);
  });
}


export const createProduct = (req: Request, res: Response) => {
  const { name, price, num_products } = req.body || null;

  console.log(req.body);

  if (name === null || price === null || num_products === null) {
    console.log('VALORES INCORRECTOS');
    res.status(404).json('Valores incorrectos');
    return;
  }

  model.createProduct(name, price, num_products).then(() => {
    console.log('Producto anadido');
  }).catch((err) => {
    console.log('Problema con db');
    res.status(204).end(err);
  });

}


export const deleteProductById = (req: Request, res: Response) => {
  const id = req.params.id || null;

  if (id === null) {
    res.status(404).json("Error en el id del producto");
  }
  model.deleteProductById(id).then(() => {
    console.log('Producto eliminado');
  }).catch((err) => {
    console.log('Problema con db');
    res.status(204).end(err);
  });

}

export const updateProductById = (req: Request, res: Response) => {

  const id = req.params.id || null;
  const { name, price, num_products } = req.body;
  let updateFields: string = "";

  if (id === null) {
    res.status(404).json("Error en el id del producto");
    return;
  }

  if (name !== undefined) {
    updateFields += (`name = '${name}'`);
  }
  if (price !== undefined) {
    if (updateFields !== "") {
      updateFields += ',';
    }
    updateFields += (`price = '${price}'`);
  }
  if (num_products !== undefined) {
    if (updateFields !== "") {
      updateFields += ',';
    }
    updateFields += (`num_products = '${num_products}'`);
  }

  model.updateProductById(id, updateFields).then(() => {
    console.log('Producto actualizado');
    res.status(200).end('Producto actualizado');
  }).catch((err: any) => {
    console.log('Problema con db');
    res.status(204).end(err);
  });
}


