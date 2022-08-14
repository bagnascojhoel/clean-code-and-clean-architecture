# Clean Code & Clean Architecture

I'm using this repository to persist all code I create while following the course [by Rodrigo Branas
on Clean Code and Clean Architecture](https://app.branas.io/public/products/369206b9-2a0d-4322-b1f6-3e9d22336740).
Alongside the code, I've taken [some notes](https://bagnascojhoel.notion.site/Clean-Code-Architecture-Course-30b9c27a28b440c2be92ce1e11f4cca2) on the topics that were newer or more complex for me.

## Environments

The environment variable `NODE_ENV` is used to specify in which environment the application is running. 

- When testing with Jest, its value is `test`
- When running for development, its value is `development` (default value)

## Running

### Tests

```
yarn test:migrate

yarn test 
// or yarn test:unit
// or yarn test:integration
```

### Local with Postgres

Postgres port is 5432. You will also have a client running on port `8080` (adminer).
Username is `postgres` and password `postgres`.

```bash
docker-compose -f compose.infra.yaml up -d
yarn knex migrate:latest
yarn up
```

