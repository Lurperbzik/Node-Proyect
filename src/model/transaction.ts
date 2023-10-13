import pool from '../database/index';

export class Model {

    public async buyProduct(user_Id: any, product_Id: string, cantidad: number): Promise<String> {
    await pool.query('BEGIN');

    try {
        const result = await pool.query("SELECT num_products FROM producto WHERE id = $1", [product_Id]);

        if (result.rows.length === 0 || result.rows[0].num_products < cantidad) {
            throw new Error('No hay suficientes productos disponibles');
        }

        await pool.query('INSERT INTO transaccion (id_producto, id_user, cantidad) VALUES ($1, $2, $3)', [product_Id, user_Id, cantidad]);
        await pool.query('UPDATE Producto SET num_products = num_products - $1 WHERE id = $2', [cantidad, product_Id]);

        return 'Compra realizada';
        
    } catch (error) {
        await pool.query('ROLLBACK');
        console.log('Error en la compra', error);
        throw new Error('Error al realizar la compra');
    } finally {
        await pool.query('COMMIT');
    }
}


    public async getPersonalInventory(user_Id: any) : Promise <String> {

        return new Promise((resolve, reject) => {
            pool.query('SELECT id_producto, cantidad FROM transaccion WHERE id_user = $1', [user_Id], async (err:any, res: any) => {
                if(err){
                    reject(err);
                    return;
                }
                if(res.rows.length > 0){
                    resolve(res.rows);
                } else{
                    resolve('No hay ningún producto en Compras');
                }
            });
        });

    }

    public async getGeneralInventory(): Promise <String> {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM transaccion", async (err:any, res: any) => {
                if(err){
                    reject(err);
                    return;
                }
                if(res.rows.length > 0){
                    resolve(res.rows);
                } else{
                    reject('No hay ninguna transaccion');
                }
            });
        });
    }
}
