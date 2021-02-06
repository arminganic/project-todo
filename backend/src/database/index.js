import mongodb from "mongodb";
import makeTodoDatabase from "./db-todo.js";

const MongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017";
const database = "db-todo";
const client = new MongoClient(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

async function makeDatabase() {
  if (!client.isConnected()) {
    await client.connect();
  }
  return client.db(database);
}

const todoDatabase = makeTodoDatabase({ makeDatabase });
export default todoDatabase;
