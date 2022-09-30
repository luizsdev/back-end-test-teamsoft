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
const infoEndereco_1 = require("../Services/infoEndereco");
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
class clienteController {
    //CONTROLLER PARA LER CLIENTES
    static lerClientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            exports.prisma.cliente
                .findMany({
                include: {
                    enderecos: true,
                },
            })
                .then((clientes) => {
                return res.status(201).json(clientes);
            })
                .catch(() => {
                return res.status(400).json({ message: 'Erro ao ler clientes' });
            });
        });
    }
    static lerClientesPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield exports.prisma.cliente
                .findUnique({
                where: { id: Number(id) },
                include: {
                    enderecos: true,
                },
            })
                .then((cliente) => {
                return res.status(201).json(cliente);
            })
                .catch(() => {
                return res.status(400).json({ message: 'Erro ao ler cliente' });
            });
        });
    }
    //CONTROLLER PARA CADASTRO DE CLIENTES
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
                yield exports.prisma.endereco
                    .create({
                    data: {
                        logradouro: primeiroendereco.logradouro,
                        numero: primeiroendereco.numero,
                        complemento: primeiroendereco.complemento,
                        bairro: primeiroendereco.bairro,
                        cidade: primeiroendereco.cidade,
                        estado: primeiroendereco.estado,
                        cep: primeiroendereco.cep,
                        latitude: '',
                        longitude: '',
                        clienteId: cliente.id,
                    },
                })
                    .then((endereco) => __awaiter(this, void 0, void 0, function* () {
                    (0, infoEndereco_1.infoEndereco)(endereco.cep)
                        .then((cord) => __awaiter(this, void 0, void 0, function* () {
                        yield exports.prisma.endereco.update({
                            where: { id: endereco.id },
                            data: { latitude: cord.lat, longitude: cord.lng },
                        });
                    }))
                        .then(() => __awaiter(this, void 0, void 0, function* () {
                        const enderecoAtualizado = yield exports.prisma.endereco.findUnique({ where: { id: endereco.id } });
                        return res.status(201).json({ message: 'Cliente cadastrado com sucesso', cliente, enderecoAtualizado });
                    }))
                        .catch(() => {
                        return res.status(400).json({ message: 'Erro ao cadastrar endereco, cheque seu cep' });
                    });
                }))
                    .catch(() => __awaiter(this, void 0, void 0, function* () {
                    //REMOVE O USER CRIADO COM DADOS DE ENDEREÇO FALTANDO
                    yield exports.prisma.cliente.delete({ where: { id: cliente.id } });
                    return res.status(400).json({ message: 'Erro ao cadastrar endereço' });
                }));
            }))
                .catch((e) => {
                if (e.code === 'P2002') {
                    return res.status(400).json({ message: 'Cliente já cadastrado' });
                }
                else {
                    return res.status(400).json({ message: 'Erro ao cadastrar endereço' });
                }
            });
        });
    }
    //CONTROLLER PARA ATUALIZAR CLIENTES
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
                .then((cliente) => {
                return res.status(201).json({ message: 'Cliente atualizado com sucesso', cliente });
            })
                .catch(() => {
                return res.status(400).json({ message: 'Erro ao atualizar cliente' });
            });
        });
    }
    //CONTROLLER PARA REMOVER CLIENTES
    static removerClientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield exports.prisma.cliente
                .delete({ where: { id: Number(id) } })
                .then((cliente) => __awaiter(this, void 0, void 0, function* () {
                return res.status(201).json({ message: 'Cliente e seus endereços removidos com sucesso', cliente });
            }))
                .catch(() => {
                return res.status(400).json({ message: 'Erro ao remover cliente' });
            });
        });
    }
    //CONTROLLER PARA ADICIONAR ENDEREÇOS
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
                .then((endereco) => {
                return res.status(201).json({ message: 'Endereço adicionado com sucesso', endereco });
            })
                .catch(() => {
                return res.status(400).json({ message: 'Erro ao adicionar endereço' });
            });
        });
    }
    //CONTROLLER PARA ATUALIZAR ENDEREÇOS
    static atualizarEndereco(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { logradouro, numero, complemento, bairro, cidade, estado, cep } = req.body;
            (0, infoEndereco_1.infoEndereco)(cep)
                .then((cord) => __awaiter(this, void 0, void 0, function* () {
                yield exports.prisma.endereco
                    .update({
                    where: { id: Number(id) },
                    data: {
                        logradouro,
                        numero,
                        complemento,
                        bairro,
                        cidade,
                        estado,
                        cep,
                        latitude: cord.lat,
                        longitude: cord.lng,
                    },
                })
                    .then((endereco) => {
                    return res.status(201).json({ message: 'Endereço atualizado com sucesso', endereco });
                })
                    .catch(() => {
                    return res.status(400).json({ message: 'Erro ao atualizar endereço' });
                });
            }))
                .catch(() => {
                res.json(400).json({ message: 'Erro ao atualizar endereço, cheque seu cep' });
            });
        });
    }
    //CONTROLLER PARA REMOVER ENDEREÇOS
    static removerEndereco(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield exports.prisma.endereco
                .delete({ where: { id: Number(id) } })
                .then((endereco) => {
                return res.status(201).json({ message: 'Endereço removido com sucesso', endereco });
            })
                .catch(() => {
                return res.status(400).json({ message: 'Erro ao remover endereço' });
            });
        });
    }
}
exports.clienteController = clienteController;
