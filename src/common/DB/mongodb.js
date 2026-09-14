import { MongoClient } from "mongodb";
const client = new MongoClient(process.env.DB_URL);
const db = client.db("saraha");
export default db;