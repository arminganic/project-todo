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
    const result = await todosService.create(data);

    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 201,
      body: { result },
    };
  }

  async function edit(httpRequest) {
    const id = httpRequest.params.id;
    const data = httpRequest.body;
    await todosService.edit({ id, data });

    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 201,
    };
  }

  async function remove(httpRequest) {
    const id = httpRequest.params.id;
    await todosService.remove({ id });

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
    edit,
    remove,
  });
}
