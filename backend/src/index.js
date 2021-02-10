import buildTodoController from "./controllers/todo.controller.js";
import database from "./database/index.js";
import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const apiRoot = process.env.API_ROOT;

app.use(bodyParser.json());

app.get(`${apiRoot}/todos`, (req, res) => {
  const todoController = buildTodoController({
    database,
  });
  todoController
    .getAll(req)
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
});

app.post(`${apiRoot}/todo`, (req, res) => {
  const todoController = buildTodoController({
    database,
  });
  todoController
    .create(req)
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
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
