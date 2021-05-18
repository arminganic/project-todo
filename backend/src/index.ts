import buildTodoController from "./controllers/todo.controller.js";
import database from "./database/index.js";
import express from "express";
import dotenv from "dotenv";
import { TodoController } from "./models/todo-controller.model.js";

dotenv.config();

const app = express();
const port: number = +process.env.PORT || 3000;
const apiRoot: string = process.env.API_ROOT;

const todoController: TodoController = buildTodoController(database);

app.use(express.json());

app.get(`${apiRoot}/todos`, makeCallback(todoController.getAll));

app.put(`${apiRoot}/todo/:id`, makeCallback(todoController.edit));
app.post(`${apiRoot}/todo`, makeCallback(todoController.create));
app.delete(`${apiRoot}/todo/:id`, makeCallback(todoController.remove));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

function makeCallback(controllerFunction: any) {
  return (req: any, res: any) => {
    controllerFunction(req)
      .then((httpResponse: any) => {
        if (httpResponse.headers) {
          // todo: refactor this
          res.set(httpResponse.headers);
        }
        res.type("json");
        res.status(httpResponse.statusCode);
        res.send(httpResponse.body);
      })
      .catch((e: any) => {
        res.status(500);
        res.send({ error: e.message });
      });
  };
}
