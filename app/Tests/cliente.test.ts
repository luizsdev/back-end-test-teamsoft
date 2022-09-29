import app from '../index';
import supertest from 'supertest';
import { prisma } from '../Controllers/clienteController';
let userId: number;
let enderecoId: number;
describe('ROTAS CLIENTE', () => {
  it('GET || LER CLIENTES', async () => {
    const response = await supertest(app).get('/clientes');
    expect(response.status).toBe(201);
  });

  it('POST || CADASTRAR CLIENTES', async () => {
    const response = await supertest(app)
      .post('/cadastrocliente')
      .send({
        cnpj: '12345678901234',
        razaoSocial: 'teste',
        nomeDoContato: 'teste',
        telefone: '21999999999',
        primeiroendereco: {
          logradouro: 'teste',
          numero: '123',
          complemento: 'teste',
          bairro: 'teste',
          cidade: 'teste',
          estado: 'RJ',
          cep: '12345678',
          latitude: '123',
          longitude: '123',
        },
      });
    userId = response.body.cliente.id;
    enderecoId = response.body.endereco.id;
    console.log(response.body);
    expect(response.status).toBe(201);
  });
  it('PUT || ATUALIZAR CLIENTES', async () => {
    const response = await supertest(app).put(`/atualizarcliente/${userId}`).send({
      cnpj: '43210987654321',
      razaoSocial: 'atualizarTeste',
      nomeDoContato: 'atualizarTeste',
      telefone: '11999999999',
    });
    expect(response.status).toBe(201);
  });
});
describe('ROTAS ENDEREÇO', () => {
  it('POST || CADASTRAR ENDEREÇO', async () => {
    const response = await supertest(app).post(`/cadastroendereco/${userId}`).send({
      logradouro: 'atualizarTeste',
      numero: '123',
      complemento: 'novoTeste',
      bairro: 'novoTeste',
      cidade: 'novoTeste',
      estado: 'SP',
      cep: '87654321',
      latitude: 'novoTeste',
      longitude: 'novoTeste',
    });
    expect(response.status).toBe(201);
  });
});
