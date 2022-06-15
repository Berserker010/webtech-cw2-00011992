const selectElement = (selector) => {
  return document.querySelector(selector);
};

const selectAllElements = (selector) => {
  return document.querySelectorAll(selector);
};

const fetchGet = async (action, callback) => {
  try {
    const response = await fetch(action, {
      method: "GET",
    });
    const data = await response.json();
    callback(data);
  } catch (err) {
    throw err;
  }
};

const fetchPost = async (action, body, callback) => {
  try {
    const response = await fetch(action, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    callback(data);
  } catch (err) {
    throw err;
  }
};

const fetchDelete = async (action, callback) => {
  try {
    const response = await fetch(action, {
      method: "DELETE",
    });
    const data = await response.json();
    callback(data);
  } catch (err) {
    throw err;
  }
};

const fetchPut = async (action, body, callback) => {
  try {
    const response = await fetch(action, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    callback(data);
  } catch (err) {
    throw err;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const todoForm = selectElement("#todoForm");
  const editTodoTitleEl = selectElement("#todoTitle");
  const editTodoTaskEl = selectElement("#todoTask");
  const todoSaveBtn = selectElement("#saveTodo");
  const createTodoBtn = selectElement("#createTodo");
  const cancelSaveBtn = selectElement("#cancelSave");

  cancelSaveBtn?.addEventListener("click", () => {
    todoForm.classList.remove("show");
    createTodoBtn.classList.remove("hide");
  });

  createTodoBtn?.addEventListener("click", () => {
    todoForm.setAttribute("data-todo", "createTodo");
    todoForm.classList.add("show");
    createTodoBtn.classList.add("hide");
  });

  document.addEventListener("click", (e) => {
    const element = e.target;
    if (element.hasAttribute("data-complete")) {
      const id = element.getAttribute("data-complete");
      fetchPut(`/todos/complete/${id}`, {}, (data) => {
        if (!data.success) return;
        window.location.href = "/todos";
      });
      return;
    }

    if (element.hasAttribute("data-delete")) {
      const id = element.getAttribute("data-delete");
      fetchDelete(`/todos/delete/${id}`, (data) => {
        if (!data.success) return;
        window.location.href = "/todos";
      });
      return;
    }

    if (element.hasAttribute("data-todo")) {
      const id = element.getAttribute("data-todo");
      fetchGet(`/todos/${id}`, (data) => {
        if (!data.success) return;
        const todo = data.todo;
        todoForm.setAttribute("data-todo", id);
        editTodoTitleEl.value = todo.title;
        editTodoTaskEl.value = todo.task;
        todoForm.classList.add("show");
        createTodoBtn.classList.add("hide");
      });
      return;
    }
  });

  todoSaveBtn?.addEventListener("click", (e) => {
    const id = todoForm.getAttribute("data-todo");
    if (!id) return;
    if (id === "createTodo") return createNewTodo();
    const body = {
      title: editTodoTitleEl.value,
      task: editTodoTaskEl.value,
    };
    const { title, task, priority } = body;
    if (title.trim() === "" || task.trim() === "") {
      return;
    }
    fetchPut(`/todos/edit/${id}`, body, (data) => {
      if (!data.success) return;
      window.location.href = "/todos";
    });
  });

  function createNewTodo() {
    const body = {
      title: editTodoTitleEl.value,
      task: editTodoTaskEl.value,
    };
    const { title, task } = body;
    if (title.trim() === "" || task.trim() === "") {
      return;
    }
    fetchPost(`/todos/create`, body, (data) => {
      if (!data.success) return;
      window.location.href = "/todos";
    });
  }
});
