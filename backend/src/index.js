import addTodoFactory from "./use-cases/add-todo.js";
import express from "../node_modules/express/index.js";

// const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  console.log("Hello World!");
  const addTodo = addTodoFactory({
    database: {
      insert: (data) => console.log(data),
    },
  });
  addTodo({
    author: "Armin",
    text: "Call 911",
  });
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
