export default function makeTodoDatabase({ makeDatabase }) {
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
