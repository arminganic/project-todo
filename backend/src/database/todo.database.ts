import mongodb, { Db } from "mongodb";
import { Todo } from "../models/todo.model";
import { TodoDatabase } from "../models/todo-database.model";

export default function buildTodoDatabase(
  makeDatabase: () => Promise<Db>
): TodoDatabase {
  const collection: string = "todo";

  async function findAll(): Promise<Todo[]> {
    const database: Db = await makeDatabase();
    return await database.collection<Todo>(collection).find().toArray();
  }

  async function findById({ id: _id }: any): Promise<Todo> {
    const database: Db = await makeDatabase();
    const results: Todo[] = await database
      .collection<Todo>(collection)
      .find({ _id: new mongodb.ObjectID(_id) })
      .toArray();
    if (results.length === 0) {
      return null;
    }
    return results[0];
  }

  async function insert(entity: any): Promise<Todo> {
    const database: Db = await makeDatabase();
    const result: mongodb.InsertOneWriteOpResult<mongodb.WithId<Todo>> =
      await database.collection<Todo>(collection).insertOne(entity);
    const { ...insertedInfo } = result.ops[0];
    return { ...insertedInfo };
  }

  async function update({ id, data }: any): Promise<void> {
    const database: Db = await makeDatabase();
    // updateOne(filter, updatedDocument, options)
    await database.collection<Todo>(collection).updateOne(
      { _id: new mongodb.ObjectID(id) },
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

  async function remove({ id: _id }: any): Promise<number> {
    const database: Db = await makeDatabase();
    const result: mongodb.DeleteWriteOpResultObject = await database
      .collection<Todo>(collection)
      .deleteOne({ _id: new mongodb.ObjectID(_id) });
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
