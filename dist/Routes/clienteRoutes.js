"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarDadosClientes_1 = require("../Middlewares/validarDadosClientes");
const clienteController_1 = require("../Controllers/clienteController");
const cors_1 = __importDefault(require("cors"));
const router = (0, express_1.Router)();
router.use((0, cors_1.default)());
//FAZ UMA LEITURA DE TODOS OS CLIENTES E SEUS ENDEREÇOS
router.get('/clientes', clienteController_1.clienteController.lerClientes);
//FAZ UMA LEITURA DE UM CLIENTE ESPECÍFICO E SEUS ENDEREÇOS BASEADO NO ID
router.get('/clientes/:id', clienteController_1.clienteController.lerClientesPorId);
//CRIA UM NOVO CLIENTE
router.post('/cadastrocliente', validarDadosClientes_1.validarDadosClientes, clienteController_1.clienteController.cadastrarClientes);
//ALTERA OS DADOS DE UM CLIENTE EXISTENTE
router.put('/atualizarcliente/:id', clienteController_1.clienteController.atualizarClientes);
//REMOVE UM CLIENTE, CONSEQUENTEMENTE SEUS ENDEREÇOS TAMBÉM
router.delete('/removercliente/:id', clienteController_1.clienteController.removerClientes);
//ADICIONA UM ENDEREÇO BASEADO NO ID DO CLIENTE
router.post('/cadastroendereco/:id', validarDadosClientes_1.validarDadosEndereco, clienteController_1.clienteController.adicionarEndereco);
//ALTERA OS DADOS DE UM ENDEREÇO BASEADO NO SEU ID
router.put('/atualizarendereco/:id', clienteController_1.clienteController.atualizarEndereco);
//REMOVE UM ENDEREÇO BASEADO NO SEU ID
router.delete('/removerendereco/:id', clienteController_1.clienteController.removerEndereco);
exports.default = router;
