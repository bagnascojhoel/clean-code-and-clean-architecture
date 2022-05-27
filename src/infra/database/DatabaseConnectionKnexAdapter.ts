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

    async query(statement: string, params?: any): Promise<any> {
        return this.knex.raw(statement, params);
    }

}
