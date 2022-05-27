import DatabaseConnectionKnexAdapter from "../../../src/infra/database/DatabaseConnectionKnexAdapter";
import OrderRepositoryDatabase from "../../../src/infra/repository-database/OrderRepositoryDatabase"
import OrderMother from "../../object-mother/OrderMother";

it('Should be greater than zero when inserting value', async () => {
    const connection = new DatabaseConnectionKnexAdapter();
    const repository = new OrderRepositoryDatabase(connection);
    expect(await repository.insert(OrderMother.createRubensOrder())).toBeGreaterThan(0);
})