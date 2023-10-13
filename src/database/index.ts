import { Pool } from 'pg';
import dotenv from 'dotenv'

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  database: process.env.DB_NAME || 'BASE_DATOS',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432
});

pool.connect()
  .then((results) => {
    console.log('Conetado a la DB');
  })
  .catch(error => console.error('Error al conectar a la DB: ', error));

export default pool