# Provi backend

API REST desenvolvida com **NodeJS + Express** para a empresa Provi.

- Sistema: Form guiado, onde os usuários preenchem suas informações pessoais para solicitar um empréstimo.

## :rocket: Como executar

1 - Clone este repositório
`$ git clone https://github.com/axpalx/provi-backend`

2 - Acesse a pasta do projeto
`$ cd provi-backend`

3 - Crie as tabelas no banco de dados, conforme arquivo `tables_db.sql`

4 - Crie um arquivo `.env` e configure as variáveis de ambiente conforme mostrado no arquivo `.env.example`, com as configurações do seu banco de dados(MySQL);

5 - Instale as dependências
`$ npm install`

6 - Execute a aplicação em modo de desenvolvimento
`$ npm start`

```bash
O servidor inciará na porta:3003 - acesse <http://localhost:3003>
```

## 📚 Documentação completa

- https://documenter.getpostman.com/view/11226752/TVzPmy7P

## 🔧 Tecnologias utilizada

- Axios;
- Bcryptjs;
- Dotenv;
- Node.js;
- Express;
- Jsonwebtoken;
- Knex;
- MySQL;
- Typescript;
- Uuid

## 📬 API utilizada para validar o CEP

- Via Cep: https://github.com/viniciussanchez/viacep
