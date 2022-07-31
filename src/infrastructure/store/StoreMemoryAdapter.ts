import Store from "./Store";

export default class StoreMemoryAdapter implements Store {
    private store: any = {};

    set(key: string, value: any): Promise<void> {
        this.store[key] = value
        return Promise.resolve()
    }

    get(key: string): Promise<any> {
        return Promise.resolve(this.store[key])
    }

}
