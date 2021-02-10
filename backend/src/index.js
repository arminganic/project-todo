import buildTodoController from "./controllers/todo.controller.js";
import database from "./database/index.js";
import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const apiRoot = process.env.API_ROOT;

const todoController = buildTodoController({
  database,
});

app.use(bodyParser.json());

app.get(`${apiRoot}/todos`, makeCallback(todoController.getAll));
app.post(`${apiRoot}/todo`, makeCallback(todoController.create));
app.delete(`${apiRoot}/todo/:id`, makeCallback(todoController.remove));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

function makeCallback(controllerFunction) {
  return (req, res) => {
    controllerFunction(req)
      .then((httpResponse) => {
        if (httpResponse.headers) {
          res.set(httpResponse.headers);
        }
        res.type("json");
        res.status(httpResponse.statusCode);
        res.send(httpResponse.body);
      })
      .catch((e) => {
        res.status(500);
        res.send({ error: e.message });
      });
  };
}
