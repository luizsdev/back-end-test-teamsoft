import { Router } from 'express';
import { clienteController } from '../Controllers/clienteController';
import cors from 'cors';
const router = Router();
router.use(cors());

//FAZ UMA LEITURA DE TODOS OS CLIENTES
router.get('/clientes', clienteController.lerClientes);
//CRIA UM NOVO CLIENTE
router.post('/cadastrocliente', clienteController.cadastrarClientes);
//ALTERA OS DADOS DE UM CLIENTE EXISTENTE
router.put('/alterarcliente');
//DELETA UM CLIENTE
router.delete('/removercliente');

export default router;
