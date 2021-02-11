import mongodb from "mongodb";

export default function buildTodoDatabase({ makeDatabase }) {
  const ObjectID = mongodb.ObjectID;
  const collection = "todo";

  async function findAll() {
    const database = await makeDatabase();
    return await database.collection(collection).find().toArray();
  }

  async function findById({ id: _id }) {
    const database = await makeDatabase();
    const results = await database
      .collection(collection)
      .find({ _id: new ObjectID(_id) })
      .toArray();
    if (results.length === 0) {
      return null;
    }
    return results[0];
  }

  async function insert(entity) {
    const database = await makeDatabase();
    const result = await database.collection(collection).insertOne(entity);
    const { ...insertedInfo } = result.ops[0];
    return { ...insertedInfo };
  }

  async function update({ id, data }) {
    const database = await makeDatabase();
    // updateOne(filter, updatedDocument, options)
    await database.collection(collection).updateOne(
      { _id: new ObjectID(id) },
      {
        $set: {
          author: data.getAuthor(),
          text: data.getText(),
          createdOn: data.getCreatedOn(),
          modifiedOn: data.getModifiedOn(),
        },
      },
      { upsert: true }
    );
  }

  async function remove({ id: _id }) {
    const database = await makeDatabase();
    const result = await database
      .collection(collection)
      .deleteOne({ _id: new ObjectID(_id) });
    return result.deletedCount;
  }

  return Object.freeze({
    findAll,
    findById,
    insert,
    update,
    remove,
  });
}
