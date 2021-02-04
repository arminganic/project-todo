import createTodo from "../entities/todo.js";

export default function addTodoFactory({ database }) {
  return function addTodo(data) {
    const todo = createTodo(data);

    return database.insert({
      author: todo.getAuthor(),
      text: todo.getText(),
      createdOn: todo.getCreatedOn(),
      modifiedOn: todo.getModifiedOn(),
    });
  };
}
