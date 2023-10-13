"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const package_json_1 = __importDefault(require("../package.json"));
const products_routes_1 = __importDefault(require("./routes/products.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const transaction_routes_1 = __importDefault(require("./routes/transaction.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.json({
        name: package_json_1.default.name,
        author: package_json_1.default.author,
        description: package_json_1.default.description,
        version: package_json_1.default.version
    });
});
app.use('/products', products_routes_1.default);
app.use('/users', user_routes_1.default);
app.use('/auth', auth_routes_1.default);
app.use('/transaction', transaction_routes_1.default);
exports.default = app;
