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
    buyProduct(user_Id, product_Id, cantidad) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield index_1.default.query("SELECT num_products FROM producto WHERE id = $1", [product_Id]);
                if (result.rows.length === 0 || result.rows[0].num_products < cantidad) {
                    throw new Error('No hay suficientes productos disponibles');
                }
                yield index_1.default.query('INSERT INTO transaccion (id_producto, id_user, cantidad) VALUES ($1, $2, $3)', [product_Id, user_Id, cantidad]);
                yield index_1.default.query('UPDATE Producto SET num_products = num_products - $1 WHERE id = $2', [cantidad, product_Id]);
                yield index_1.default.query('COMMIT');
                return 'Compra realizada';
            }
            catch (error) {
                yield index_1.default.query('ROLLBACK');
                console.log('Error en la compra', error);
                throw new Error('Error al realizar la compra');
            }
        });
    }
    getPersonalInventory(user_Id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                index_1.default.query('SELECT id_producto, cantidad FROM transaccion WHERE id_user = $1', [user_Id], (err, res) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (res.rows.length > 0) {
                        resolve(res.rows);
                    }
                    else {
                        resolve('No hay ningún producto en Compras');
                    }
                }));
            });
        });
    }
    getGeneralInventory() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                index_1.default.query("SELECT * FROM transaccion", (err, res) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (res.rows.length > 0) {
                        resolve(res.rows);
                    }
                    else {
                        reject('No hay ninguna transaccion');
                    }
                }));
            });
        });
    }
}
exports.Model = Model;
