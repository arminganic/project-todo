import { Todo } from "./todo.model";

export interface TodoService {
  getAll: () => Promise<Todo[]>;
  create: (data: Todo) => Promise<Todo>;
  edit: (id: string, data: Todo) => Promise<void>;
  remove: (id: string) => Promise<number>;
}
