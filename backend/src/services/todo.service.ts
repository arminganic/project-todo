import createTodo from "../entities/todo.entity.js";

export default function buildTodoService({ database }: any) {
  async function getAll() {
    return await database.findAll();
  }

  function create(data: any) {
    const todo = createTodo(data);

    return database.insert({
      author: todo.getAuthor(),
      text: todo.getText(),
      createdOn: todo.getCreatedOn(),
      modifiedOn: todo.getModifiedOn(),
    });
  }

  async function edit({ id, data }: any) {
    const todo = await database.findById({ id });
    const updatedTodo = createTodo({
      ...data,
      createdOn: todo.createdOn,
    });

    return database.update({
      id,
      data: updatedTodo,
    });
  }

  async function remove({ id }: any) {
    const deletedCount = await database.remove({ id });

    return {
      deletedCount,
      message: "Todo deleted.",
    };
  }

  return Object.freeze({
    getAll,
    create,
    edit,
    remove,
  });
}
