# README - Back-end em C#

Este é o parte do projeto do back-end desenvolvido em C#. Aqui estão as informações necessárias para iniciar o projeto e uma descrição das rotas essenciais.

## Pré-requisitos

Antes de iniciar o projeto, certifique-se de ter os seguintes pré-requisitos instalados:

- [.NET SDK](https://dotnet.microsoft.com/download) - versão 5.0 ou superior
- [Visual Studio](https://visualstudio.microsoft.com/) ou outro editor de código de sua preferência

## Iniciando o Projeto


```shell
dotnet restore
```

```shell
dotnet build
```

```shell
dotnet run
```

Agora o projeto está sendo executado e você pode acessar as rotas essenciais descritas abaixo.

## Rotas Essenciais

Aqui estão algumas rotas essenciais disponíveis no back-end:

### GET api/produto/

Retorna a lista de produtos cadastrados .


### GET api/produto/{id}

Retorna  produtos cadastrados com o id informado na requisição.


### GET api/lista/

Retorna a listas de desejos cadastradas .


### GET api/lista/{userId}

Retorna as listas criadas por um usuario espefico.


### GET api/lista/

Retorna a listas de desejos cadastradas .


### GET api/listaProduto/{idLista}

Retorna os produtos cadastrados nas listas de um usuario espefico.




