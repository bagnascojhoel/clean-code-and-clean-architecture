# Clean Code & Clean Architecture

I'm using this repository to persist all code I create while following the course [by Rodrigo Branas
about Clean Code And Clean Architecture](https://app.branas.io/public/products).

## Environments

The environment variable `NODE_ENV` is used to specify in which environment the application is running. 

- When testing with Jest, its value is `test`
- When running for development, its value is `development` (default value)

## Running

### Local with actual database implementation

Postgres port is 5432. You will also have a client running on port `8080` (adminer).
Username is `postgres` and password `postgres`.
```
    docker-compose -f compose.infra.yaml up -d
    // or docker compose
```

