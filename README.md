<h1 align="center">API-CLIENTES</h1>

## 🎯 SOBRE O PROJETO

**Essa aplicação é uma API do tipo REST onde se pode administrar clientes por meio de métodos de cadastro, alteração de dados, remoção de dados e leitura dos mesmos. Tudo armazenado em uma banco de dados do tipo mySQL**

## 🚀 TECNOLOGIAS

- NodeJS
- MySQL
- Prisma
- Express
- TypeScript
- Jest
- Supertest
- Eslint
- Geocoding API

## ✨ RESUMO

- **Express** - Esse framework me impressiona todas as vezes que o utilizo, é simplesmente incrível a facilitação da criação de rotas, da validação de dados e uma infindade de funções oferecidasa.

- **MySQL** - Banco de dados poderoso e relativamente simples de se configurar, o que o torna ainda mais atrativo.

- **Prisma** - Esse ORM é simplesmente uma maravilha, a quantidade de trabalho e tempo otimizado é algo de outro mundo, suas queries economizam linhas de código, facilita leitura de código, além do mais, colabora e muito para a integração e criação de tabelas no banco de dados, com um incrível funcionamento com MySQL
- **Jest** - Quando se aprende a usar o Jest, tudo se torna mais fácil, toda alteração é validada mais rápido com um ciclo de testes bem feito.
- **Supertest**- Essa biblioteca ajuda muito no teste de rotas da minha API
- **TypeScript** - É de extrema necessidade que se use TypeScript hoje em dia ao invés de JavaScript puro, visto que ajuda na escrita de códigos e consequentemente facilita e muito a criação de serviços dentro de um projeto
- **Eslint** - É uma ótima ferramenta para manter um padrão de projeto ideal
- **Geocoding API** - Essa ferramenta oferecida pelo google é extremamente eficiente e foi o que possibilitou a inclusão de latitude e longitude no cadastro de endereços

## 🌌 LICENÇA

Distribuído sob licença MIT. olhe `LICENSE.txt` para mais informações.

## ✅ Como rodar o projeto localmente

- Criar no diretório principal do repositório o arquivo .env e declarar as credenciais do banco de dados e API, exemplo: DATABASE_URL="MySQL" e API_KEY="" para a Geocoding API

```bash
git clone https://github.com/luizsdev/back-end-test-teamsoft
cd ./back-end-test-teamsoft

npm install

npm run build
npm run start

```

## 🏁 Como testar a aplicação

- **Usando npm**

```bash
npm run test
```

## 📝API Endpoints

<details>
<summary>ROTAS DE CLIENTE</summary>

`GET` `/clientes` -> Retorna uma lista de todos os clientes cadastrados </br>
`GET` `/clientes/:id` -> Retorna um cliente específico baseado no id passado </br>
`POST` `/cadastrocliente` -> Cria um novo cliente junto a um endereço baseado em um JSON passado no request, segue exemplo:

```json
{
  "cnpj": "12345678901234",
  "razaoSocial": "teste",
  "nomeDoContato": "teste",
  "telefone": "21999999999",
  "primeiroendereco": {
    "logradouro": "teste",
    "numero": "123",
    "complemento": "teste",
    "bairro": "teste",
    "cidade": "teste",
    "estado": "RJ",
    "cep": "65068312"
  }
}
```

`PUT` `/atualizarcliente/:id` -> Atualiza um cliente, com base no id passado, com o(s) dado(s) passados em um JSON, segue exemplo onde só é atualizado o telefone: </br>

```json
{
  "telefone": "11999999999"
}
```

`DELETE` `/removerclientes/:id` -> Remove um cliente do banco juntamente com seus endereços cadastrados </br>

</details>

<details>
<summary>ROTAS DE ENDEREÇO</summary>

`POST` `/cadastrarendereco/:id` -> Cadastra um novo endereço para o cliente com o id passado, com os dados de um JSON, segue exemplo: </br>

```json
{
  "logradouro": "teste",
  "numero": "10",
  "complemento": "teste",
  "bairro": "teste",
  "cidade": "teste",
  "estado": "SC",
  "cep": "89074666"
}
```

`PUT` `/atualizarendereco/:id` -> Atualiza os dados de um endereço com base em um id(endereço) passado, com os dados de um JSON, segue exemplo onde apenas o CEP é alterado:

```json
{
  "cep": "82540170"
}
```

`DELETE` `/removerendereco/:id` -> Remove um endereço baseado em um id(endereço) passado.

</details>

## Bonus Points

- Documentação ✔️
- Buscar a Latitude e longitude com o google ✔️
- TypeScript ✔️
- Testes ✔️
