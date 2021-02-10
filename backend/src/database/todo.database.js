export default function buildTodoDatabase({ makeDatabase }) {
  const collection = "todo";

  async function findAll() {
    const database = await makeDatabase();
    return await database.collection(collection).find().toArray();
  }

  async function insert(entity) {
    const database = await makeDatabase();
    const result = await database.collection(collection).insertOne(entity);
    const { ...insertedInfo } = result.ops[0];
    return { ...insertedInfo };
  }

  return Object.freeze({
    findAll,
    insert,
  });
}
