export default interface Detail {
    name: string,
    hoursUsed: number,
    expiration: number,
    rpm?: number,
    voltage?: number,
    temperature?: number,
    parent?: Detail
}