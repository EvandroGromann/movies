# API

## Descrição
API RESTful

## Requisitos
- Node.js (versão 20 ou superior)
- npm (versão 8 ou superior)

## Instalação

1. Instale as dependências:
    ```bash
    npm install
    ```

## Executando a Aplicação

1. Inicie o servidor em modo de desenvolvimento:
    ```bash
    npm run dev
    ```

2. A aplicação estará disponível em `http://localhost:3000/api`.

## Endpoints

- `GET /health`: Endpoint de health check para verificar a saúde da aplicação.

## Executando os Testes

1. Execute todos os testes:
    ```bash
    npm run test:all
    ```

2. Execute os testes unitários:
    ```bash
    npm run test:unit
    ```

3. Execute os testes de features:
    ```bash
    npm run test:features
    ```

4. Execute os testes de integração:
    ```bash
    npm run test:integration
    ```