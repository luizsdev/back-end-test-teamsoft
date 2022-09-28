"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clienteController_1 = require("../Controllers/clienteController");
const cors_1 = __importDefault(require("cors"));
const router = (0, express_1.Router)();
router.use((0, cors_1.default)());
//FAZ UMA LEITURA DE TODOS OS CLIENTES
router.get('/clientes', clienteController_1.clienteController.lerClientes);
//CRIA UM NOVO CLIENTE
router.post('/cadastrocliente', clienteController_1.clienteController.cadastrarClientes);
//ALTERA OS DADOS DE UM CLIENTE EXISTENTE
router.put('/alterarcliente');
//DELETA UM CLIENTE
router.delete('/removercliente');
exports.default = router;
