import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import indexRoute from "./routes/index.js";
import todosRoute from "./routes/todos.js";

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/static", express.static("public"));

app.use("/", indexRoute);

app.use("/todos", todosRoute);

app.get("*", (req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server on: http://localhost:${PORT}/`);
});
