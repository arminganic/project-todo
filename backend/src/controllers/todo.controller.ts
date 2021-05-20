import { TodoController } from "../models/todo-controller.model";
import { Todo } from "../models/todo.model";
import { TodoDatabase } from "../models/todo-database.model";
import { Response } from "../models/response.model";
import { TodoService } from "../models/todo-service.model";
import { Request } from "express";
import buildTodoService from "../services/todo.service.js";

export default function buildTodoController(
  database: TodoDatabase
): Readonly<TodoController> {
  const todosService: Readonly<TodoService> = buildTodoService(database);

  async function getAll(): Promise<Response<Todo[]>> {
    const todos: Todo[] = await todosService.getAll();

    return {
      headers: {
        contentType: "application/json",
      },
      statusCode: 200,
      body: todos,
    };
  }

  async function create(httpRequest: Request): Promise<Response<Todo>> {
    const data: Todo = httpRequest.body;
    const result: Todo = await todosService.create(data);

    return {
      headers: {
        contentType: "application/json",
      },
      statusCode: 201,
      body: result,
    };
  }

  async function edit(httpRequest: Request): Promise<Response> {
    const id: string = httpRequest.params.id;
    const data: Todo = httpRequest.body;
    await todosService.edit(id, data);

    return {
      headers: {
        contentType: "application/json",
      },
      statusCode: 201,
    };
  }

  async function remove(httpRequest: Request): Promise<Response> {
    const id: string = httpRequest.params.id;
    await todosService.remove(id);

    return {
      headers: {
        contentType: "application/json",
      },
      statusCode: 201,
    };
  }

  return Object.freeze({
    getAll,
    create,
    edit,
    remove,
  });
}
