"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
const index_1 = __importDefault(require("../database/index"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class Model {
    signup(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield index_1.default.query("SELECT * FROM users WHERE email = $1", [email]);
                if (existingUser.rows.length > 0) {
                    throw new Error('El email ya está en uso');
                }
                const saltRounds = 10;
                const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
                yield index_1.default.query("INSERT INTO users (email, password) values ($1, $2)", [email, hashedPassword]);
                return 'Usuario añadido';
            }
            catch (error) {
                console.error('Error en signup:', error);
                throw error;
            }
        });
    }
    deleteUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                index_1.default.query("DELETE FROM users WHERE email = $1", [email], (err, res) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        console.log('Error en delete');
                        reject(err);
                        return;
                    }
                    console.log(`Usuario con email ${email} eliminado`);
                    resolve(`Usuario con email ${email} eliminado`);
                }));
            });
        });
    }
    updateUser(email, updateFields) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const query = `UPDATE USERS SET ${updateFields} WHERE email = $1`;
                index_1.default.query(query, [email], (err, res) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        console.log('Error en Update');
                        reject(err);
                        return;
                    }
                    console.log(`Usuario con email ${email} actualizado`);
                    resolve(`Usuario con email ${email} actualizado`);
                }));
            });
        });
    }
}
exports.Model = Model;
