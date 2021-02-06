import addTodoController from "./controllers/add-todo.js";
import express from "express";
import makeTodoDatabase from "./database/index.js";

const app = express();
const port = 3000;

const database = makeTodoDatabase();

app.get("/", (req, res) => {
  const response = addTodoController(req);
  res.send(response);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  database.insert();
});
