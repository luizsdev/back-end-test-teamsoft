"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clienteRoutes_1 = __importDefault(require("./Routes/clienteRoutes"));
const PORT = process.env.port || 5000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/', clienteRoutes_1.default);
app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
});
exports.default = app;
