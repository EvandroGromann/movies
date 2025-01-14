# API

## Descrição
API RESTful para retorno de informações referente a filmes e suas premiações.

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

2. A aplicação estará disponível em `http://localhost:3000`.

## Endpoints

- `GET /health`: Endpoint de health check para verificar a saúde da aplicação.
- `GET /api/movies/:movie_id`: Retorna o filme bucando pelo id.
- `GET /api/movies`: Retorna uma lista paginada de filmes.
- `POST /api/movies`: Cria um novo filme.
- `PUT /api/movies/:movie_id`: Atualiza os dados de um filme.
- `GET /api/awards/interval`: Retorna o produtor com maior intervalo entre dois prêmios consecutivos e o que obteve dois prêmios mais rápido.

## Executando os Testes

1. Execute todos os testes:
    ```bash
    npm run test:all
    ```

2. Execute os testes unitários:
    ```bash
    npm run test:unit
    ```

3. Execute os testes de integração:
    ```bash
    npm run test:integration
    ```

4. Executar a cobertura de testes (coverage):
    ```bash
    npm run coverage:details
    ```