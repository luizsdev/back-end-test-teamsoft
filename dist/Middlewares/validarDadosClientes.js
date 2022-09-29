"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarDadosClientes = void 0;
const validarDadosClientes = (req, res, next) => {
    const { cnpj, telefone, primeiroendereco } = req.body;
    if (cnpj.length !== 14) {
        res.status(400).json({ message: 'CNPJ inválido, lembre-se de inserir apenas números sem espaços' });
    }
    else if (telefone.length !== 11) {
        res.status(400).json({ message: 'Telefone inválido, lembre-se de inserir apenas números sem espaços' });
    }
    else if (primeiroendereco.length === 0) {
        res.status(400).json({ message: 'Dados inválidos para endereço' });
    }
    next();
};
exports.validarDadosClientes = validarDadosClientes;
