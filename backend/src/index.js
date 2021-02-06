import todoDatabase from "./database/index.js";
import addTodoController from "./controllers/add-todo.js";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  const response = addTodoController(req);
  res.send(response);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  todoDatabase.insert();
});
