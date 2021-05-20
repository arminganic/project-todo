import { Response } from "./response.model";
import { Todo } from "../models/todo.model";
import { Request } from "express";

export interface TodoController {
  getAll: () => Promise<Response<Todo[]>>;
  create: (httpRequest: Request) => Promise<Response<Todo>>;
  edit: (httpRequest: Request) => Promise<Response>;
  remove: (httpRequest: Request) => Promise<Response>;
}
