import { Todo } from "../models/todo.model";

export interface TodoDatabase {
  findAll: () => Promise<Todo[]>;
  findById: ({ id: _id }: any) => Promise<Todo>;
  insert: (entity: any) => Promise<Todo>;
  update: ({ id, data }: any) => Promise<void>;
  remove: ({ id: _id }: any) => Promise<number>;
}
