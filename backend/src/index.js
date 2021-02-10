import buildTodoController from "./controllers/todo.controller.js";
import database from "./database/index.js";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
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
      res.send({ error: "An unknown error occured." });
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
