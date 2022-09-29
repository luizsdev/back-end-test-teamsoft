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
            res.status(400).json({ message: 'Cliente já cadastrado' });
        });
    }
    static atualizarClientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cnpj, razaoSocial, nomeDoContato, telefone } = req.body;
            const { id } = req.params;
            yield exports.prisma.cliente
                .update({
                where: { id: Number(id) },
                data: {
                    cnpj,
                    razaoSocial,
                    nomeDoContato,
                    telefone,
                },
            })
                .then(() => {
                res.status(200).json({ message: 'Cliente atualizado com sucesso' });
            })
                .catch(() => {
                res.status(400).json({ message: 'Erro ao atualizar cliente' });
            });
        });
    }
    static removerCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield exports.prisma.cliente
                .delete({ where: { id: Number(id) } })
                .then(() => __awaiter(this, void 0, void 0, function* () {
                res.status(200).json({ message: 'Cliente e seus endereços removidos com sucesso' });
            }))
                .catch(() => {
                res.status(400).json({ message: 'Erro ao remover cliente' });
            });
        });
    }
    static adicionarEndereco(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { logradouro, numero, complemento, bairro, cidade, estado, cep, latitude, longitude } = req.body;
            yield exports.prisma.endereco
                .create({
                data: {
                    logradouro,
                    numero,
                    complemento,
                    bairro,
                    cidade,
                    estado,
                    cep,
                    latitude,
                    longitude,
                    clienteId: Number(id),
                },
            })
                .then(() => {
                res.status(200).json({ message: 'Endereço adicionado com sucesso' });
            })
                .catch(() => {
                res.status(400).json({ message: 'Erro ao adicionar endereço' });
            });
        });
    }
    static atualizarEndereco(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { logradouro, numero, complemento, bairro, cidade, estado, cep, latitude, longitude } = req.body;
            yield exports.prisma.endereco
                .update({
                where: { id: Number(id) },
                data: { logradouro, numero, complemento, bairro, cidade, estado, cep, latitude, longitude },
            })
                .then(() => {
                res.status(200).json({ message: 'Endereço atualizado com sucesso' });
            })
                .catch(() => {
                res.status(400).json({ message: 'Erro ao atualizar endereço' });
            });
        });
    }
    static removerEndereco(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield exports.prisma.endereco
                .delete({ where: { id: Number(id) } })
                .then(() => {
                res.status(200).json({ message: 'Endereço removido com sucesso' });
            })
                .catch(() => {
                res.status(400).json({ message: 'Erro ao remover endereço' });
            });
        });
    }
}
exports.clienteController = clienteController;
