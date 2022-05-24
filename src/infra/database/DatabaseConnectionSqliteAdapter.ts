import DatabaseConnection from "./DatabaseConnection";
import { Database } from 'sqlite3'

export default class DatabaseConnectionSequelizeAdapter implements DatabaseConnection {
    private database: Database;

    constructor() {
        this.database = new Database(':memory:');
    }

    async query(statement: string, params?: any): Promise<any> {
        return this.database.run(statement, params);
    }

}
