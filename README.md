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

- Criar no diretório principal do repositório o arquivo .env e setar as credenciais do banco de dados e API the example: DATABASE_URL="MySQL" & API_KEY="" for the Google Geocoding API

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

`GET` `/users` -> Return a list of all users </br>
`GET` `/users/:id` -> Return a specific user based on an id </br>
`POST` `/createuser` -> Create a new user based on the body of the request as -> user, email and name </br>
`PUT` `/updateuser/:id` -> Update a specific user based on an id and body of the request with new data as -> user, email and name </br>
`DELETE` `/products/:id` -> Delete a specific user based on an id </br>
