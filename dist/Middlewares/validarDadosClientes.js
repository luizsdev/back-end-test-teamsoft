"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarDadosEndereco = exports.validarDadosClientes = void 0;
const validarDadosClientes = (req, res, next) => {
    const { cnpj, telefone, primeiroendereco } = req.body;
    if (primeiroendereco.numero &&
        primeiroendereco.bairro &&
        primeiroendereco.cidade &&
        primeiroendereco.estado &&
        primeiroendereco.cep) {
        if (cnpj.length !== 14) {
            res.status(400).json({ message: 'CNPJ inválido, lembre-se de inserir apenas números sem espaços' });
        }
        else if (telefone.length !== 11) {
            res
                .status(400)
                .json({ message: 'Telefone inválido, lembre-se de incluir DDD e de inserir apenas números sem espaços' });
        }
        else {
            next();
        }
    }
    else {
        res.status(200).json({ message: 'Cheque os campos: numero,bairro,cidade,estado e cep' });
    }
};
exports.validarDadosClientes = validarDadosClientes;
const validarDadosEndereco = (req, res, next) => {
    const { numero, bairro, cidade, estado, cep } = req.body;
    if (numero === null || numero.length <= 0) {
        return res.status(400).json({ message: 'Digite o número de seu endereço' });
    }
    else if (bairro === null || bairro.length <= 0) {
        return res.status(400).json({ message: 'Digite o seu bairro' });
    }
    else if (cidade === null || cidade.length <= 0) {
        return res.status(400).json({ message: 'Digite a sua cidade' });
    }
    else if (estado === null || estado.length <= 0) {
        return res.status(400).json({ message: 'Digite o seu estado' });
    }
    else if (estado.length !== 2 || estado.length <= 0) {
        return res.status(400).json({ message: 'Digite o código de seu estado com apenas duas letras' });
    }
    else if (cep.length !== 8) {
        return res.status(400).json({ message: 'CEP inválido, lembre-se de inserir apenas números sem espaços' });
    }
    else {
        next();
    }
};
exports.validarDadosEndereco = validarDadosEndereco;
