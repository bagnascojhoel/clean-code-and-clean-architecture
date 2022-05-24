import WarehouseItemRepositoryMemory from "../../../src/infra/repository-store/WarehouseItemRepositoryStore";
import WarehouseItemMother from "../../object-mother/WarehouseItemMother";

it('Should be 0 when saving first warehouse item', () => {
    const repository = new WarehouseItemRepositoryMemory();
    const warehouseItem = WarehouseItemMother.createCamera();
    const actual = repository.create(warehouseItem);
    expect(actual).toBe(0);
})