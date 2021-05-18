import mongodb, { Db } from "mongodb";
import buildTodoDatabase from "./todo.database.js";

const url: string = "mongodb://localhost:27017";
const database: string = "db-todo";
const client: mongodb.MongoClient = new mongodb.MongoClient(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

async function makeDatabase(): Promise<Db> {
  if (!client.isConnected()) {
    await client.connect();
  }
  return client.db(database);
}

export default buildTodoDatabase(makeDatabase);
