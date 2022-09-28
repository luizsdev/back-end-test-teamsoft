"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clienteController = exports.prisma = void 0;
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
class clienteController {
    static lerClientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            exports.prisma.cliente
                .findMany({
                include: {
                    enderecos: true,
                },
            })
                .then((clientes) => {
                res.json(clientes);
            })
                .catch((e) => {
                console.log(e);
                res.status(400).json({ message: 'Erro ao ler clientes' });
            });
        });
    }
    static cadastrarClientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cnpj, razaoSocial, nomeDoContato, telefone, primeiroendereco } = req.body;
            const checarCliente = yield exports.prisma.cliente.findUnique({ where: { cnpj } });
            if (!checarCliente) {
                yield exports.prisma.cliente
                    .create({
                    data: {
                        cnpj,
                        razaoSocial,
                        nomeDoContato,
                        telefone,
                    },
                })
                    .then((cliente) => __awaiter(this, void 0, void 0, function* () {
                    yield exports.prisma.endereco.create({
                        data: {
                            logradouro: primeiroendereco.logradouro,
                            numero: primeiroendereco.numero,
                            complemento: primeiroendereco.complemento,
                            bairro: primeiroendereco.bairro,
                            cidade: primeiroendereco.cidade,
                            estado: primeiroendereco.estado,
                            cep: primeiroendereco.cep,
                            latitude: primeiroendereco.latitude,
                            longitude: primeiroendereco.longitude,
                            clienteId: cliente.id,
                        },
                    });
                    res.status(200).json({ message: 'Cliente cadastrado com sucesso' });
                }))
                    .catch(() => {
                    res.status(400).json({ message: 'Erro ao cadastrar cliente' });
                });
            }
            else {
                res.status(400).json({ message: 'Cliente já cadastrado' });
            }
        });
    }
}
exports.clienteController = clienteController;
/* static async atualizarClientes(req: Request, res: Response) {}
  static async removerClientes(req: Request, res: Response) {}  */
