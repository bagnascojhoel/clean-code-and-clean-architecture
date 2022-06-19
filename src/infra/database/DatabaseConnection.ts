export default interface DatabaseConnection {
    query(statement: string, params?: any): Promise<any>
    migrate(): Promise<any>
    clear(table: string): Promise<any>
    destroyConnection(): Promise<any>
}
