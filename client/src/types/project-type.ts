import Detail from "./detail-type";

export default interface Project {
    _id: string,
    name: string,
    creatorId: string,
    data: Detail[],
    creationTime: Date,
    lastChangesTime: Date
}