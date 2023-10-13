import pool from '../database/index'

interface Product {
  id: number;
  name: string;
  price: number;
  num_products: number;
}

export class Model {

  public async getProducts(): Promise<Product[]> {

    return new Promise((resolve, reject) => {
      pool.query("SELECT name, price, num_products FROM Producto WHERE num_products > 0", async (err: any, res: any) => {
        if (err) {
          reject(err);
          return;
        }

        if (res.rows.length > 0) {
          resolve(res.rows);
        } else {
          reject('No hay ningun producto en el stock');
        }
      });
    });

  }

  public async getProductById(id: any): Promise<Product> {

    return new Promise((resolve, reject) => {
      pool.query("SELECT name, price, num_products FROM Producto WHERE id = $1", [id], async (err: any, res: any) => {
        if (err) {
          reject(err);
          return;
        }
        if (res.rows.length > 0) {
          resolve(res.rows);
        } else {
          reject(`No hay ningun producto con id ${id}`);
        }
      });
    });
  }

  public async createProduct(name: any, price: any, num_products: any): Promise<String> {

    return new Promise((resolve, reject) => {
      pool.query("INSERT INTO Producto (name, price, num_products) values ($1, $2, $3)",
        [name, price, num_products],
        async (err: any, res: any) => {
          if (err) {
            console.error('Error Insert:', err);
            reject(err);
            return;
          }
          resolve('Anadido nuevo producto');
        });
    });

  }

  public async deleteProductById(id: any): Promise<String> {

    return new Promise((resolve, reject) => {
      pool.query("DELETE FROM Producto WHERE id = $1", [id], async (err: any, res: any) => {
        if (err) {
          console.error('Error en Delete', err);
          reject(err);
          return;
        }
        console.log(`Producto con id ${id} eliminado`);
        resolve(`Producto con id ${id} eliminadinterface CustomRequest extends Request {
          user?: any; // Aquí defines el tipo de la propiedad user, ajusta según sea necesario
        }o`);
      });
    });

  }

  public async updateProductById(id: any, updateFields: string): Promise<String> {

    return new Promise((resolve, reject) => {
      const query = `UPDATE Producto SET ${updateFields} WHERE id = $1`;
      pool.query(query, [id], async (err: any, res: any) => {
        if (err) {
          console.error('Error en Update');
          reject(err);
          return;
        }
        console.log(`Producto con id ${id} actualizado`);
        resolve(`Producto con id ${id} actualizado`);
      });
    });
  }

}