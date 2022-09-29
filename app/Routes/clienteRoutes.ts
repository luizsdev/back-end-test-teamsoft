import { Router } from 'express';
import { validarDadosClientes } from '../Middlewares/validarDadosClientes';
import { clienteController } from '../Controllers/clienteController';
import cors from 'cors';
const router = Router();
router.use(cors());

//FAZ UMA LEITURA DE TODOS OS CLIENTES
router.get('/clientes', clienteController.lerClientes);
//CRIA UM NOVO CLIENTE
router.post('/cadastrocliente', validarDadosClientes, clienteController.cadastrarClientes);
//ALTERA OS DADOS DE UM CLIENTE EXISTENTE
router.put('/atualizarcliente/:id', clienteController.atualizarClientes);
//REMOVE UM CLIENTE, CONSEQUENTEMENTE SEUS ENDEREÇOS TAMBÉM
router.delete('/removercliente/:id', clienteController.removerCliente);
//ADICIONA UM ENDEREÇO BASEADO NO ID DO CLIENTE
router.post('/adicionarendereco/:id', clienteController.adicionarEndereco);
//ALTERA OS DADOS DE UM ENDEREÇO BASEADO NO  ID DE UM ENDEREÇO
router.put('/atualizarendereco/:id', clienteController.atualizarEndereco);
//REMOVE UM ENDEREÇO BASEADO NO ID DE UM CLIENTE E ID DO ENDEREÇO
router.delete('/removerendereco/:id', clienteController.removerEndereco);

export default router;
