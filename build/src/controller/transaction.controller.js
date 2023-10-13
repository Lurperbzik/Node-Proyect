"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGeneralInventory = exports.getPersonalInventory = exports.buyProduct = void 0;
const transaction_1 = require("../model/transaction");
const model = new transaction_1.Model();
exports.buyProduct = ((req, res) => {
    const product_Id = req.body.id_product || null;
    const user_Id = req.user;
    let cantidad = req.body.cantidad || null;
    if (product_Id === null) {
        return res.status(404).json("Error en el id del producto");
    }
    if (cantidad === null || cantidad <= 0) {
        cantidad = 1;
    }
    try {
        model.buyProduct(user_Id, product_Id, cantidad);
        res.status(200).json("Producto comprado");
    }
    catch (err) {
        res.status(404).json({ err: err });
    }
});
exports.getPersonalInventory = ((req, res) => {
    const user_Id = req.user;
    try {
        model.getPersonalInventory(req.user).then((inventory) => {
            res.status(200).json(inventory);
        });
    }
    catch (error) {
        res.end(error);
    }
});
exports.getGeneralInventory = ((req, res) => {
    try {
        model.getGeneralInventory().then((inventory) => {
            res.status(200).json(inventory);
        });
    }
    catch (error) {
        res.end(error);
    }
});
