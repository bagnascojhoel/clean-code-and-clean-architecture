import type { Knex } from "knex";
import knex from "knex"
import DatabaseConnection from "./DatabaseConnection";
import DatabaseConnectionProperties from "./DatabaseConnectionKnexProperties";

export default class DatabaseConnectionKnexAdapter implements DatabaseConnection {
    private knex: Knex;

    constructor() {
        const knexProperties = new DatabaseConnectionProperties
        this.knex = knex(knexProperties.getConfig(process.env.NODE_ENV ?? 'development'));
    }

    public async query(statement: string, params?: any): Promise<any> {
        return await this.knex.raw(statement, params);
    }

    public async migrate(): Promise<any> {
        await this.knex.migrate.latest()
    }

    public async clear(table: string): Promise<any> {
        await this.knex.truncate().from(table)
    }

    public async destroyConnection(): Promise<any> {
        await this.knex.destroy()
    }
}
