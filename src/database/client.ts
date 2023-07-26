import AggregateInterface from "@/database/queries/aggregate.interface";

require("dotenv").config();

import { MongoClient, Document } from "mongodb";

class Connection {

    public static instance: Connection;

    private constructor(private mongoCon: MongoClient) {}

    static async getInstance() {
        if (!Connection.instance) {
            try {
                const mongo = new MongoClient(process!.env!.CONNECTION_URI!);
                await mongo.connect();
                Connection.instance = new Connection(mongo);
            } catch (err) {
                console.log(err);
            }
        }

        return Connection.instance;
    }


    public aggregate(ag: AggregateInterface) {
        const {
            db,
            col,
            pipeline
        } = ag;

        return this.mongoCon.db(db).collection(col).aggregate(pipeline).toArray();
    }
}

export { Connection };
