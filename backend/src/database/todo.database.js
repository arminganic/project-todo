export default function makeTodoDatabase({ makeDatabase }) {
  return Object.freeze({
    findAll,
    insert,
  });

  async function findAll() {
    const database = await makeDatabase();
    const result = await database.collection("todo").find().toArray();
    return result;
  }

  async function insert() {
    const database = await makeDatabase();
    const result = await database
      .collection("todo")
      .insertOne({ author: "Armin Ganic" });
    const { ...insertedInfo } = result.ops[0];
    return { ...insertedInfo };
  }
}
