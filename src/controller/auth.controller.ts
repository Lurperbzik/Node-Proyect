import { Request, Response } from 'express';
import { model } from '../model/auth';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
  }

  try {
    const token = await model.login(email, password);
    res.json({ token });
  } catch (error) {
    console.error('Error en login:', error );
    res.status(401).json({ error: error });
  }
};
