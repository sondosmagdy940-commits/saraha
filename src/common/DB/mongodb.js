import { MongoClient } from "mongodb";
import { env } from "../config/env.js";
const client = new MongoClient(env.db.url);
const db = client.db("saraha");
export default db;