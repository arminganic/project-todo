import todoDatabase from "./database/index.js";
import addTodoController from "./controllers/add-todo.js";
import express from "express";

const app = express();
const port = 3000;

const database = todoDatabase;

app.get("/", (req, res) => {
  const response = addTodoController(req);
  res.send(response);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  database.insert();
});
