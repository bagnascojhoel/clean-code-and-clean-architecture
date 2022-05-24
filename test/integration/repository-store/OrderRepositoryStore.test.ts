import OrderRepositoryStore from "../../../src/infra/repository-store/OrderRepositoryStore"
import StoreMemoryAdapter from "../../../src/infra/store/StoreMemoryAdapter"
import OrderMother from "../../object-mother/OrderMother"

it('Should be 0 when inserting order', async () => {
    const connection = new StoreMemoryAdapter()
    const orderRepositoryMemory = new OrderRepositoryStore(connection)
    const order = OrderMother.createRubensOrder()
    const actual = await orderRepositoryMemory.insert(order)
    expect(actual).toBe(0)
})