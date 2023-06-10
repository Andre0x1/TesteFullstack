# README - Back-end em Node.js

Este é o repositório do projeto do back-end desenvolvido em Node.js. Aqui estão as informações necessárias para iniciar o projeto e uma descrição das rotas essenciais.

## Pré-requisitos

Antes de iniciar o projeto, certifique-se de ter os seguintes pré-requisitos instalados:

- [Node.js](https://nodejs.org) - versão 12 ou superior
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/) (gerenciadores de pacotes)

## Iniciando o Projeto

```shell
npm install
```

ou, se estiver usando Yarn:

```shell
yarn install
```

4. Após a instalação das dependências, execute o seguinte comando para iniciar o projeto:

```shell
npm start
```

ou, se estiver usando Yarn:

```shell
yarn start
```

## Rotas Essenciais

Aqui estão algumas rotas essenciais disponíveis no back-end:

### POST /usuario/login

Realiza o login de um usuário. Os seguintes campos devem ser fornecidos no corpo da solicitação:

```json
{
  "email": "example@example.com",
  "senha": "senha123"
}
```

### POST /usuario/register

Registra um novo usuário. Os seguintes campos devem ser fornecidos no corpo da solicitação:

```json
{
  "nome": "John Doe",
  "senha": "senha123"
}
```


### POST /produto

Cria um novo produto. Os seguintes campos devem ser fornecidos no corpo da solicitação:

```json
{
  "nome": "Produto 1",
  "descricao": "Descrição do Produto 1",
  "link": "https://www.youtube.com/"
}
```
### POST /lista

Cria um nova lista. Os seguintes campos devem ser fornecidos no corpo da solicitação:

```json
{
    "idUsuario": "6483685e6c2a722bc3d49d25",
    "nome": "Lista Teste 5"
}
```

### POST /listaProdutos

Cria um novo produto para a lista. Os seguintes campos devem ser fornecidos no corpo da solicitação:

```json
 {
        "idLista": "648368706c2a722bc3d49d28",
        "idProduto": "64831e3c7a4baabd70f6a10f"
 },
```
