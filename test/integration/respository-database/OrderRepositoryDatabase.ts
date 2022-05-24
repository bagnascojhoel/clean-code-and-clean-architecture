import DatabaseConnectionSequelizeAdapter from "../../../src/infra/database/DatabaseConnectionSqliteAdapter";
import OrderRepositoryDatabase from "../../../src/infra/repository-database/OrderRepositoryDatabase"
import OrderMother from "../../object-mother/OrderMother";

it('Should be 1 when inserting first registry', () => {
    const connection = new DatabaseConnectionSequelizeAdapter();
    const repository = new OrderRepositoryDatabase(connection);
    expect(repository.insert(OrderMother.createRubensOrder())).toBe(1);
})