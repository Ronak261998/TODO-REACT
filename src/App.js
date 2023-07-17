import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [todos, setTodos] = useState([]);
  function handleAddItem(todo) {
    setTodos((todos) => [...todos, todo]);
  }

  function handleToggleItem(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function handleDeleteTodo(id) {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }

  function handleUpdateTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  }

  function editTask(task, id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  }

  return (
    <div className="TodoWrapper ">
      <Form onAddItem={handleAddItem} />
      <TodoList
        todos={todos}
        onDeleteItem={handleDeleteTodo}
        onToggleItem={handleToggleItem}
        onUpdateItem={handleUpdateTodo}
        editTask={editTask}
      />
    </div>
  );
}

function Form({ onAddItem }) {
  const [task, setTask] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!task) return;

    const newTodo = {
      task,
      id: Date.now(),
      isEditing: false,
      completed: false,
    };
    console.log(newTodo);

    onAddItem(newTodo);
    setTask("");
  }
  return (
    <form className="TodoForm">
      <input
        className="todo-input"
        type="text"
        placeholder="What is the task for today..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button className="todo-btn" onClick={handleSubmit}>
        Add Task
      </button>
    </form>
  );
}

function TodoList({
  todos,
  onDeleteItem,
  onUpdateItem,
  onToggleItem,
  editTask,
}) {
  return (
    <div>
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTask={editTask} todo={todo} key={todo.id} />
        ) : (
          <Todo
            todo={todo}
            key={todo.id}
            onDeleteItem={onDeleteItem}
            onUpdateItem={onUpdateItem}
            onToggleItem={onToggleItem}
          />
        )
      )}
    </div>
  );
}

function Todo({ todo, onDeleteItem, onUpdateItem, onToggleItem }) {
  return (
    <li className="Todo ">
      <label
        onClick={() => onToggleItem(todo.id)}
        className={todo.completed ? "completed" : ""}
      >
        {todo.task}
      </label>
      <button
        className="fa-trash todo-btn"
        onClick={() => onDeleteItem(todo.id)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <button className="todo-btn" onClick={() => onUpdateItem(todo.id)}>
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>
    </li>
  );
}

function EditTodoForm({ editTask, todo }) {
  const [task, setTask] = useState(todo.task);

  function handleSubmit(e) {
    e.preventDefault();

    editTask(task, todo.id);
    setTask("");
  }
  return (
    <form className="TodoForm">
      <input
        className="todo-input"
        type="text"
        placeholder="Update Task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button className="todo-btn" onClick={handleSubmit}>
        Update task
      </button>
    </form>
  );
}

export default App;
