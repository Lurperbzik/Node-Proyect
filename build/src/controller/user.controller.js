"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.signup = void 0;
const user_1 = require("../model/user");
const model = new user_1.Model();
const signup = (req, res) => {
    const { email, password } = req.body || null;
    if (email === null || password === null) {
        console.log('VALORES INCORRECTOS');
        res.status(404).json('Valores incorrectos');
        return;
    }
    model.signup(email, password).then((message) => {
        res.status(201).json({ message });
    }).catch((err) => {
        res.status(409).end(err.message);
    });
};
exports.signup = signup;
const deleteUser = (req, res) => {
    const email = req.params.email || null;
    console.log(email);
    if (email === null) {
        console.log('VALORES INCORRECTOS');
        res.status(404).json('Valores incorrectos');
        return;
    }
    model.deleteUser(email).then(() => {
        console.log('Usuario eliminado');
    }).catch((err) => {
        console.log('Problema con db');
        res.status(204).end(err);
    });
};
exports.deleteUser = deleteUser;
const updateUser = (req, res) => {
    const { password, rol } = req.body;
    const email = req.params.email || null;
    let updateFields = "";
    if (email === null) {
        console.log('Email invalido');
        res.status(404).end('Email invalido');
        return;
    }
    if (password !== undefined) {
        updateFields += (`password = '${password}'`);
    }
    if (rol !== undefined) {
        if (updateFields !== "") {
            updateFields += ',';
        }
        updateFields += (`rol = '${rol}'`);
    }
    model.updateUser(email, updateFields).then(() => {
        console.log('Usuario actualizado');
        res.status(200).end('Usuario actualizado');
    }).catch((err) => {
        console.log('Problema con db');
        res.status(204).end(err);
    });
};
exports.updateUser = updateUser;
