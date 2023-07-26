import { Document } from "mongodb";

export default interface AggregateInterface {
    db: string;
    col: string;
    pipeline: Document[]
}
