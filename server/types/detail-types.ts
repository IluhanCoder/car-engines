export default interface Detail {
    name: string,
    hoursUsed: number,
    durability: number,
    rpm?: number,
    voltage?: number,
    parent?: Detail,
    allowedChildren?: Detail[]
}
