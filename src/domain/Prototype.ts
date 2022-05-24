export default interface Prototype<T> {
    cloneDeep(payload?: any): T
}
