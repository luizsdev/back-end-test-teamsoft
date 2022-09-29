import { Request, Response, NextFunction } from 'express';

export const validarDadosClientes = (req: Request, res: Response, next: NextFunction) => {
  const { cnpj, telefone } = req.body;
  if (cnpj.length !== 14) {
    res.status(400).json({ message: 'CNPJ inválido, lembre-se de inserir apenas números sem espaços' });
  } else if (telefone.length !== 11) {
    res.status(400).json({ message: 'Telefone inválido, lembre-se de inserir apenas números sem espaços' });
  } else {
    next();
  }
};
