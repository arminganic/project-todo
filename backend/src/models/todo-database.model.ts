import { Todo } from "../models/todo.model";

export interface TodoDatabase {
  findAll: () => Promise<Todo[]>;
  findById: (id: string) => Promise<Todo>;
  insert: (entity: Todo) => Promise<Todo>;
  update: (id: string, data: Todo) => Promise<void>;
  remove: (id: string) => Promise<number>;
}
