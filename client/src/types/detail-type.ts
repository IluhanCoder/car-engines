export default interface Detail {
    name: string,
    hoursUsed: number,
    durability: number,
    rpm?: number,
    voltage?: number,
    maxVoltage?: number,
    parentIndex?: number,
    allowedChildren?: Detail[],
    workCoef: number,
    isWorkedOut: boolean
}
