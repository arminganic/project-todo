import createTodo from "../entities/todo.entity.js";
import { Todo } from "../models/todo.model";
import { TodoService } from "../models/todo-service.model";
import { TodoDatabase } from "../models/todo-database.model";

export default function buildTodoService(
  database: TodoDatabase
): Readonly<TodoService> {
  async function getAll(): Promise<Todo[]> {
    return await database.findAll();
  }

  function create(data: Todo): Promise<Todo> {
    const todo: Readonly<Todo> = createTodo(data);

    return database.insert({
      author: todo.author,
      text: todo.text,
      createdOn: todo.createdOn,
      modifiedOn: todo.modifiedOn,
    });
  }

  async function edit(id: string, data: Todo): Promise<void> {
    const todo: Todo = await database.findById(id);
    const updatedTodo: Todo = createTodo({
      ...data,
      createdOn: todo.createdOn,
    });

    return database.update(id, updatedTodo);
  }

  async function remove(id: string): Promise<number> {
    return await database.remove(id);
  }

  return Object.freeze({
    getAll,
    create,
    edit,
    remove,
  });
}
