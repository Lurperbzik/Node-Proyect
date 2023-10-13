"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = new pg_1.Pool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    database: process.env.DB_NAME || 'BASE_DATOS',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432
});
pool.connect()
    .then((results) => {
    console.log('Conetado a la DB');
})
    .catch(error => console.error('Error al conectar a la DB: ', error));
exports.default = pool;
