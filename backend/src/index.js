import addTodoController from "./controllers/add-todo.js";
import express from "../node_modules/express/index.js";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const response = addTodoController(req);
  res.send(response);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
