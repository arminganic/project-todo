import { Todo } from "../models/todo.model";

export default function createTodo(entity: Todo): Readonly<Todo> {
  entity.createdOn = Date.now();
  entity.modifiedOn = Date.now();

  if (!entity.author) {
    throw new Error("Todo must have an author.");
  }

  if (entity.author.length < 2) {
    throw new Error("Todo author's name must be longer than 2 characters.");
  }

  if (!entity.text || entity.text.length < 1) {
    throw new Error("Todo must include at least one character of text.");
  }

  return Object.freeze(entity);
}
