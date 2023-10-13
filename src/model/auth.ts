import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../database/index';

export class UserModel {
  private secretKey: string = process.env.JWTPRIVATEKEY || '';

  public async login(email: string, password: string): Promise<string> {
    try {
      const result = await pool.query("SELECT id, email, password, rol FROM Users WHERE email = $1", [email]);

      if (result.rows.length === 0) {
        throw new Error("User not found");
      }

      const user = result.rows[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        return this.generateToken(user.id, user.rol);
      } else {
        throw new Error("Incorrect password");
      }
    } catch (error) {
      throw error;
    }
  }

  private generateToken(userId: string, userRol: string): string {
    return jwt.sign({ userId, userRol }, this.secretKey, { expiresIn: '1h' } );
  }
}

export const model = new UserModel();
