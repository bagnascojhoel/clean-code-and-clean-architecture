# Clean Code & Clean Architecture

I'm using this repository to persist all code I create while following the course [by Rodrigo Branas
on Clean Code and Clean Architecture](https://app.branas.io/public/products/369206b9-2a0d-4322-b1f6-3e9d22336740).
Alongside the code, I've taken [some notes](https://bagnascojhoel.notion.site/Clean-Code-Architecture-Course-30b9c27a28b440c2be92ce1e11f4cca2) on the topics that were newer or more complex for me.

This project does not strictly follow Branas' implementation. I've taken different paths on parts that I wanted
to learn more. Most of it, but unfortunately not everything, was done with the TDD method. I still have things
that I would like to work on this project (implementing the front-end with Branas' approach, for instance), but
that would only be to strengthen my knowledge. For that reason, I will halt my work here and continue to use
what I've learned on different projects.

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

