import buildTodoService from "../services/todo.service.js";

export default function buildTodoController({ database }) {
  const todosService = buildTodoService({ database });

  async function getAll(httpRequest) {
    const todos = await todosService.getAll();

    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: todos,
    };
  }

  async function create(httpRequest) {
    const data = httpRequest.body;
    const result = todosService.create(data);
    console.log("Result after adding", result);

    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 201,
    };
  }

  return Object.freeze({
    getAll,
    create,
  });
}
