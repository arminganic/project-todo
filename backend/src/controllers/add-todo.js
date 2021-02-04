import addTodoFactory from "../use-cases/add-todo";

export default function addTodo(httpRequest) {
  const data = httpRequest.body;
  const addTodoUseCase = addTodoFactory({
    database: {
      insert: (data) => console.log(data),
    },
  });
  addTodoUseCase(data);

  return {
    headers: {
      "Content-Type": "application/json",
    },
    statusCode: 201,
  };
}
