import { Request, Response } from 'express';
import { Cliente, Endereco } from '../@types/clientTypes';
import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();

export class clienteController {
  //CONTROLLER PARA LER CLIENTES
  static async lerClientes(req: Request, res: Response) {
    prisma.cliente
      .findMany({
        include: {
          enderecos: true,
        },
      })
      .then((clientes: Cliente[]) => {
        return res.status(201).json(clientes);
      })
      .catch((e: Error) => {
        console.log(e);
        return res.status(400).json({ message: 'Erro ao ler clientes' });
      });
  }
  //CONTROLLER PARA CADASTRO DE CLIENTES
  static async cadastrarClientes(req: Request, res: Response) {
    const { cnpj, razaoSocial, nomeDoContato, telefone, primeiroendereco } = req.body;
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
        await prisma.endereco
          .create({
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
          })
          .then(() => {
            return res.status(201).json({ message: 'Cliente cadastrado com sucesso', cliente });
          })
          .catch(async () => {
            //REMOVE O USER CRIADO COM DADOS DE ENDEREÇO FALTANDO
            await prisma.cliente.delete({ where: { id: cliente.id } });
            return res.status(400).json({ message: 'Erro ao cadastrar endereço' });
          });
      })
      .catch((e) => {
        if (e.code === 'P2002') {
          return res.status(400).json({ message: 'Cliente já cadastrado' });
        } else {
          console.log(e);
          return res.status(400).json({ message: 'Erro ao cadastrar endereço' });
        }
      });
  }
  //CONTROLLER PARA ATUALIZAR CLIENTES
  static async atualizarClientes(req: Request, res: Response) {
    const { cnpj, razaoSocial, nomeDoContato, telefone } = req.body;
    const { id } = req.params;
    await prisma.cliente
      .update({
        where: { id: Number(id) },
        data: {
          cnpj,
          razaoSocial,
          nomeDoContato,
          telefone,
        },
      })
      .then((cliente: Cliente) => {
        return res.status(201).json({ message: 'Cliente atualizado com sucesso', cliente });
      })
      .catch(() => {
        return res.status(400).json({ message: 'Erro ao atualizar cliente' });
      });
  }
  //CONTROLLER PARA REMOVER CLIENTES
  static async removerClientes(req: Request, res: Response) {
    const { id } = req.params;
    await prisma.cliente
      .delete({ where: { id: Number(id) } })
      .then(async (cliente: Cliente) => {
        return res.status(201).json({ message: 'Cliente e seus endereços removidos com sucesso', cliente });
      })
      .catch(() => {
        return res.status(400).json({ message: 'Erro ao remover cliente' });
      });
  }
  //CONTROLLER PARA ADICIONAR ENDEREÇOS
  static async adicionarEndereco(req: Request, res: Response) {
    const { id } = req.params;
    const { logradouro, numero, complemento, bairro, cidade, estado, cep, latitude, longitude } = req.body;
    await prisma.endereco
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
      .then((endereco: Endereco) => {
        return res.status(201).json({ message: 'Endereço adicionado com sucesso', endereco });
      })
      .catch((e) => {
        console.log(e);
        return res.status(400).json({ message: 'Erro ao adicionar endereço' });
      });
  }
  //CONTROLLER PARA ATUALIZAR ENDEREÇOS
  static async atualizarEndereco(req: Request, res: Response) {
    const { id } = req.params;
    const { logradouro, numero, complemento, bairro, cidade, estado, cep, latitude, longitude } = req.body;
    await prisma.endereco
      .update({
        where: { id: Number(id) },
        data: { logradouro, numero, complemento, bairro, cidade, estado, cep, latitude, longitude },
      })
      .then((endereco: Endereco) => {
        return res.status(201).json({ message: 'Endereço atualizado com sucesso', endereco });
      })
      .catch(() => {
        return res.status(400).json({ message: 'Erro ao atualizar endereço' });
      });
  }
  //CONTROLLER PARA REMOVER ENDEREÇOS
  static async removerEndereco(req: Request, res: Response) {
    const { id } = req.params;
    await prisma.endereco
      .delete({ where: { id: Number(id) } })
      .then((endereco: Endereco) => {
        return res.status(201).json({ message: 'Endereço removido com sucesso', endereco });
      })
      .catch(() => {
        return res.status(400).json({ message: 'Erro ao remover endereço' });
      });
  }
}
