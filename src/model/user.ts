import pool from '../database/index';
import bcrypt from 'bcrypt';

export class Model {

  public async signup(email: any, password: any): Promise<String> {
    try {
      const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

      if (existingUser.rows.length > 0) {
        throw new Error('El email ya está en uso');
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      await pool.query("INSERT INTO users (email, password) values ($1, $2)", [email, hashedPassword]);

      return 'Usuario añadido';
    } catch (error) {
      console.error('Error en signup:', error);
      throw error;
    }
  }

  public async deleteUser(email: any): Promise<String> {

    return new Promise((resolve, reject) => {
      pool.query("DELETE FROM users WHERE email = $1", [email], async (err, res) => {
        if (err) {
          console.log('Error en delete');
          reject(err);
          return;
        }

        console.log(`Usuario con email ${email} eliminado`);
        resolve(`Usuario con email ${email} eliminado`);
      });
    });
  }

  public async updateUser(email: any, updateFields: string): Promise<String> {

    return new Promise((resolve, reject) => {
      const query = `UPDATE USERS SET ${updateFields} WHERE email = $1`;
      pool.query(query, [email], async (err, res) => {
        if (err) {
          console.log('Error en Update');
          reject(err);
          return;
        }

        console.log(`Usuario con email ${email} actualizado`);
        resolve(`Usuario con email ${email} actualizado`);
      })
    });
  }
}

