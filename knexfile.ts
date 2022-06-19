import type { Knex } from "knex"

const KNEX_CONFIG: { [key: string]: Knex.Config } = {
    test: {
        client: "sqlite3",
        // debug: true,
        useNullAsDefault: true,
        connection: {
            filename: "test.sqlite3"
        }
    },

    development: {
        client: "sqlite3",
        // debug: true,
        connection: {
            filename: "dev.sqlite3"
        }
    },

    staging: {
        client: "postgresql",
        connection: {
            database: "my_db",
            user: "username",
            password: "password"
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: "knex_migrations"
        }
    },

    production: {
        client: "postgresql",
        connection: {
            database: "my_db",
            user: "username",
            password: "password"
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: "knex_migrations"
        }
    }
}

export default KNEX_CONFIG