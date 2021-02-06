import mongodb from "mongodb";

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

export default function makeTodoDatabase() {
  return Object.freeze({
    insert,
  });

  async function insert() {
    const database = await makeDatabase();
    const result = await database
      .collection("todo")
      .insertOne({ author: "Armin Ganic" });
    const { ...insertedInfo } = result.ops[0];
    return { ...insertedInfo };
  }
}
