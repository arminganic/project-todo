import { Todo } from "./todo.model";

export interface TodoService {
  getAll: () => Promise<Todo[]>;
  create: (data: any) => Promise<Todo>;
  edit: ({ id, data }: any) => Promise<void>;
  remove: ({ id }: any) => Promise<number>;
}
