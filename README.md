# Clean Code & Clean Architecture

I'm using this repository to persist all code I create while following the course [by Rodrigo Branas
about Clean Code And Clean Architecture](https://app.branas.io/public/products).

## Running

### Local with actual database implementation

Postgres port is 5432. You will also have a client running on port `8080` (adminer).
Username is `postgres` and password `postgres`.
```
    docker-compose -f compose.infra.yaml up -d
    // or docker compose
```