import buildTodoService from "../services/todo.service.js";

export default function buildTodoController({ database }) {
  const todosService = buildTodoService({ database });

  async function findAll(httpRequest) {
    const todos = await todosService.getTodos();

    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: todos,
    };
  }

  async function addTodo(httpRequest) {
    const data = httpRequest.body;
    const result = todosService.addTodo(data);
    console.log("Result after adding", result);

    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 201,
    };
  }

  return Object.freeze({
    findAll,
    addTodo,
  });
}
