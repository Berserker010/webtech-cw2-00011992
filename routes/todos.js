import { Router } from "express";
import database from "../data/database.js";
import {
  deleteTodo,
  editTodo,
  createTodo,
  completeTodo,
} from "../utilities.js";

const router = Router();

router.get("/", (req, res) => {
  const todos = database.data.todos.filter(
    (todo) => !todo.isCompleted && !todo.isCanceled
  );

  const data = {
    todos: todos,
  };

  res.render("todos", { data: data, title: "Todos", path: req.path });
});

router.get("/completed", (req, res) => {
  const completedTodos = database.data.todos.filter((todo) => todo.isCompleted);
  const data = {
    todos: completedTodos,
  };
  res.render("todos", { data: data, title: "Finished Todos", path: req.path });
});

router.get("/:id", (req, res) => {
  const getByID = req.params.id;
  const todos = database.data.todos.filter(
    (todo) => !todo.isFinshed && !todo.isCanceled
  );
  const todo = todos.find((todo) => todo.id === getByID);
  if (!todo) return res.json({ msg: "The todo doesn't exist", success: false });
  res.json({ msg: "Todo found", success: true, todo: todo });
});

router.post("/create", createTodo, (req, res) => {
  res.json({ msg: "Created", success: true });
});

router.delete("/delete/:id", deleteTodo, (req, res) => {
  res.json({ msg: "Deleted", success: true });
});

router.put("/complete/:id", completeTodo, (req, res) => {
  res.json({ msg: "Completed", success: true });
});

router.put("/edit/:id", editTodo, (req, res) => {
  res.json({ msg: "Edited", success: true });
});

export default router;
