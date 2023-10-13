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
class Model {
    getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                index_1.default.query("SELECT name, price, num_products FROM Producto WHERE num_products > 0", (err, res) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (res.rows.length > 0) {
                        resolve(res.rows);
                    }
                    else {
                        reject('No hay ningun producto en el stock');
                    }
                }));
            });
        });
    }
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                index_1.default.query("SELECT name, price, num_products FROM Producto WHERE id = $1", [id], (err, res) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (res.rows.length > 0) {
                        resolve(res.rows);
                    }
                    else {
                        reject(`No hay ningun producto con id ${id}`);
                    }
                }));
            });
        });
    }
    createProduct(name, price, num_products) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                index_1.default.query("INSERT INTO Producto (name, price, num_products) values ($1, $2, $3)", [name, price, num_products], (err, res) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        console.error('Error Insert:', err);
                        reject(err);
                        return;
                    }
                    resolve('Anadido nuevo producto');
                }));
            });
        });
    }
    deleteProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                index_1.default.query("DELETE FROM Producto WHERE id = $1", [id], (err, res) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        console.error('Error en Delete', err);
                        reject(err);
                        return;
                    }
                    console.log(`Producto con id ${id} eliminado`);
                    resolve(`Producto con id ${id} eliminadinterface CustomRequest extends Request {
          user?: any; // Aquí defines el tipo de la propiedad user, ajusta según sea necesario
        }o`);
                }));
            });
        });
    }
    updateProductById(id, updateFields) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const query = `UPDATE Producto SET ${updateFields} WHERE id = $1`;
                index_1.default.query(query, [id], (err, res) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        console.error('Error en Update');
                        reject(err);
                        return;
                    }
                    console.log(`Producto con id ${id} actualizado`);
                    resolve(`Producto con id ${id} actualizado`);
                }));
            });
        });
    }
}
exports.Model = Model;
