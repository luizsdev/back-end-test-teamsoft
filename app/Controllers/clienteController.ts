import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();

export class clienteController {
  static async lerClientes(req: Request, res: Response) {
    prisma.cliente
      .findMany({
        include: {
          enderecos: true,
        },
      })
      .then((clientes: object) => {
        res.json(clientes);
      })
      .catch((e: Error) => {
        console.log(e);
        res.status(400).json({ message: 'Erro ao ler clientes' });
      });
  }
  static async cadastrarClientes(req: Request, res: Response) {
    type Cliente = { id?: number };
    const { cnpj, razaoSocial, nomeDoContato, telefone, primeiroendereco } = req.body;
    const checarCliente = await prisma.cliente.findUnique({ where: { cnpj } });
    if (!checarCliente) {
      await prisma.cliente
        .create({
          data: {
            cnpj,
            razaoSocial,
            nomeDoContato,
            telefone,
          },
        })
        .then(async (cliente: Cliente) => {
          await prisma.endereco.create({
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
        })
        .catch(() => {
          res.status(400).json({ message: 'Erro ao cadastrar cliente' });
        });
    } else {
      res.status(400).json({ message: 'Cliente já cadastrado' });
    }
  }
}
//  static async atualizarClientes(req: Request, res: Response) {}
//   static async removerClientes(req: Request, res: Response) {}
