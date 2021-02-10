import createTodo from "../entities/todo.entity.js";

export default function buildTodoService({ database }) {
  async function getTodos() {
    return await database.findAll();
  }

  function addTodo(data) {
    const todo = createTodo(data);

    return database.insert({
      author: todo.getAuthor(),
      text: todo.getText(),
      createdOn: todo.getCreatedOn(),
      modifiedOn: todo.getModifiedOn(),
    });
  }

  return Object.freeze({
    getTodos,
    addTodo,
  });
}
