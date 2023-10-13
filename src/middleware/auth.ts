import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWTPRIVATEKEY || '';

export interface CustomRequest extends Request {
  user?: string;
  rol?: string;
}

export const authenticate = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(403).send("Acces denied");
    }

    const decoded: any = jwt.verify(token, secretKey);
    req.user = decoded.userId;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

export const verifyRol = (requiredRole: string) => (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(403).send("Acces denied");
    }

    const decoded: any = jwt.verify(token, secretKey);
    req.user = decoded.userId;
    req.rol = decoded.userRol;

    if (req.rol === requiredRole) {
      next();
    } else {
      return res.status(403).send("No tienes permisos suficientes");
    }

  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

