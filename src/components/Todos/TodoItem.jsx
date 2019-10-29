import React from "react";
import { FiTrash2, FiEdit2 } from "react-icons/fi";

import EditTodo from "./EditTodo";

import './todos.scss';

const TodoItem = ({ todo, editing, toggleTodo, editTodo, updateTodo, deleteTodo, currentTodo }) => {
  const handleOnChange = () => {
    toggleTodo(todo._id);
  }

  const handleDelete = () => {
    deleteTodo(todo._id);
  }

  const handleUpdate = (todo) => {
    editTodo(todo);
  }

  return (
    <li className="todo_item">
      <input type="checkbox" id={`checkbox_${todo._id}`} checked={todo.taskDone} onChange={handleOnChange} />
      {editing && todo._id === currentTodo.id ? (
        <EditTodo currentTodo={currentTodo} updateTodo={updateTodo} />
      ) : (
        <label htmlFor={`checkbox_${todo._id}`} className="todo_desc">{todo.taskDescription}</label>
      )}
      <button onClick={() => handleUpdate(todo)} className="todo_btn_icon"><FiEdit2 /></button>
      <button onClick={handleDelete} className="todo_btn_icon"><FiTrash2 /></button>
    </li>
  )
};

export default TodoItem;