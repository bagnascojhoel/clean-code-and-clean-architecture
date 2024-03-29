export default abstract class DomainEvent {
    private readonly _key: string

    constructor(key: string) {
        this._key = key
    }

    get key(): string {
        return this._key
    }
}
