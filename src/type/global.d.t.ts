import { MongoClient } from "mongodb";

export {};

declare global {
    // eslint-disable-next-line no-var
    var _mongo: Promise<MongoClient> | undefined;
}