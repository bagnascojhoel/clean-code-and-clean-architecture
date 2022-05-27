import PlaceOrderUseCase from "../../../src/application/use-case/PlaceOrderUseCase";
import OrderRepositoryStore from "../../../src/infra/repository-store/OrderRepositoryStore";
import StoreMemoryAdapter from "../../../src/infra/store/StoreMemoryAdapter";
import CpfMother from "../../object-mother/CpfMother";
import WarehouseItemMother from "../../object-mother/WarehouseItemMother";

let placeOrderUseCase: any;

beforeEach(() => {
    const storeConnection = new StoreMemoryAdapter();
    const orderRepository = new OrderRepositoryStore(storeConnection);
    placeOrderUseCase = new PlaceOrderUseCase(orderRepository);
})

it('Should insert order on repository when input valid', async () => {
    const orderContent = {
        cpf: CpfMother.createOfRubens(),
        items: [
            {
                warehouseItem: WarehouseItemMother.createCamera(),
                quantity: 10
            }
        ]
    }
    const actual = await placeOrderUseCase.execute(orderContent)
})

it('Should create with UTC time on repository', async () => {
    const orderContent = {
        cpf: CpfMother.createOfRubens(),
        items: [
            {
                warehouseItem: WarehouseItemMother.createCamera(),
                quantity: 10
            }
        ]
    }
    const actual = await placeOrderUseCase.execute(orderContent)
})