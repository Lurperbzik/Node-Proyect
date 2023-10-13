"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRol = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.JWTPRIVATEKEY || '';
const authenticate = (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) {
            return res.status(403).send("Acces denied");
        }
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        req.user = decoded.userId;
        next();
    }
    catch (error) {
        res.status(400).send("Invalid token");
    }
};
exports.authenticate = authenticate;
const verifyRol = (requiredRole) => (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) {
            return res.status(403).send("Acces denied");
        }
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        req.user = decoded.userId;
        req.rol = decoded.userRol;
        if (req.rol === requiredRole) {
            next();
        }
        else {
            return res.status(403).send("No tienes permisos suficientes");
        }
    }
    catch (error) {
        res.status(400).send("Invalid token");
    }
};
exports.verifyRol = verifyRol;
