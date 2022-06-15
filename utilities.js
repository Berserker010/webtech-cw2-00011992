import { nanoid } from "nanoid";
import database from "./data/database.js";

const getTime = () => {
  return `${new Date()}`.split(" ").slice(0, 5).join(" ");
};

const validateString = (string) => {
  return string.replace(/[^A-Za-z0-9_]/g, "");
};

const createTodo = (req, res, next) => {
  const { title, task } = req.body;
  if (title.trim() === "" || task.trim() === "") {
    res.json({ msg: "Fields cant be empty", success: false });
    return;
  }
  const id = nanoid();
  const newTodo = {
    id: id,
    title: title,
    task: task,
    createdTime: getTime(),
    completedTime: null,
    isCanceled: false,
    isCompleted: false,
    isEdited: false,
    finishedTime: null,
  };
  database.data.todos.push(newTodo);
  database.write();
  next();
};

const completeTodo = (req, res, next) => {
  const completeByID = req.params.id;
  const todo = database.data.todos.find((todo) => todo.id === completeByID);
  todo.isCompleted = true;
  todo.isCanceled = false;
  todo.completedTime = getTime();
  database.write();
  next();
};

const editTodo = (req, res, next) => {
  const { title, task } = req.body;
  if (title.trim() === "" || task.trim() === "") {
    res.json({ msg: "Fields cant be empty", success: false });
    return;
  }
  const editByID = req.params.id;
  const todo = database.data.todos.find((todo) => todo.id === editByID);
  todo.title = title;
  todo.task = task;
  todo.isEdited = true;
  database.write();
  next();
};

const deleteTodo = (req, res, next) => {
  const id = req.params.id;
  database.data.todos = database.data.todos.filter((todo) => todo.id !== id);
  database.write();
  next();
};

export { deleteTodo, validateString, editTodo, createTodo, completeTodo };
