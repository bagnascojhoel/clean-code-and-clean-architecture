import DatabaseConnection from "../../src/infrastructure/database/DatabaseConnection";

export default async function cleanUpDatabase(connection: DatabaseConnection) {
    await Promise.all([
        connection.clear('applied_coupon'),
        connection.clear('order_item'),
        connection.clear('warehouse_item'),
        connection.clear('order'),
        connection.clear('coupon'),
        connection.clear('address'),
        connection.clear('freight'),
    ]);
}