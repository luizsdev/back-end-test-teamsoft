import app from '../index';
import supertest from 'supertest';
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
          cep: '65068312',
        },
      });
    userId = response.body.cliente.id;
    enderecoId = response.body.enderecoAtualizado.id;
    expect(response.status).toBe(201);
  });
  it('GET || LER CLIENTES POR ID', async () => {
    const response = await supertest(app).get(`/clientes/${userId}`);
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
      logradouro: 'novoTeste',
      numero: '123',
      complemento: 'novoTeste',
      bairro: 'novoTeste',
      cidade: 'novoTeste',
      estado: 'SP',
      cep: '68908780',
    });
    expect(response.status).toBe(201);
  });
  it('PUT || atualizar ENDEREÇO', async () => {
    const response = await supertest(app).put(`/atualizarendereco/${enderecoId}`).send({
      logradouro: 'atualizarTeste',
      numero: '321',
      complemento: 'atualizarTeste',
      bairro: 'atualizarTeste',
      cidade: 'atualizarTeste',
      estado: 'MG',
      cep: '64028150',
    });
    expect(response.status).toBe(201);
  });
  it('DELETE || DELETAR ENDEREÇO', async () => {
    const response = await supertest(app).delete(`/removerendereco/${enderecoId}`);
    expect(response.status).toBe(201);
  });
});
//FECHAR O CICLO DE TESTES REMOVENDO O CLIENTE INICIAL
it('DELETE || DELETAR CLIENTE', async () => {
  const response = await supertest(app).delete(`/removercliente/${userId}`);
  expect(response.status).toBe(201);
});
