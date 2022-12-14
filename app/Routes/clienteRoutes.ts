import { Router } from 'express';
import { validarDadosClientes, validarDadosEndereco } from '../Middlewares/validarDadosClientes';
import { clienteController } from '../Controllers/clienteController';
import cors from 'cors';
const router = Router();
router.use(cors());

//FAZ UMA LEITURA DE TODOS OS CLIENTES E SEUS ENDEREÇOS
router.get('/clientes', clienteController.lerClientes);
//FAZ UMA LEITURA DE UM CLIENTE ESPECÍFICO E SEUS ENDEREÇOS BASEADO NO ID
router.get('/clientes/:id', clienteController.lerClientesPorId);
//CRIA UM NOVO CLIENTE
router.post('/cadastrocliente', validarDadosClientes, clienteController.cadastrarClientes);
//ALTERA OS DADOS DE UM CLIENTE EXISTENTE
router.put('/atualizarcliente/:id', clienteController.atualizarClientes);
//REMOVE UM CLIENTE, CONSEQUENTEMENTE SEUS ENDEREÇOS
router.delete('/removercliente/:id', clienteController.removerClientes);
//ADICIONA UM ENDEREÇO BASEADO NO ID DO CLIENTE
router.post('/cadastroendereco/:id', validarDadosEndereco, clienteController.cadastrarEnderecos);
//ALTERA OS DADOS DE UM ENDEREÇO BASEADO NO SEU ID
router.put('/atualizarendereco/:id', clienteController.atualizarEndereco);
//REMOVE UM ENDEREÇO BASEADO NO SEU ID
router.delete('/removerendereco/:id', clienteController.removerEndereco);

export default router;
