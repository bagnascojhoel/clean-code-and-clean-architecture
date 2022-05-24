export default interface DatabaseConnection {
    query(statement: string, params?: any): any
}

// TODO Implement without migrations, just manual database creation
