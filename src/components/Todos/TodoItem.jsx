import React from "react";
import { FiTrash2 } from "react-icons/fi";

import './todos.scss';

const TodoItem = ({ desc, done, id, updateTodo, deleteTodo }) => {
  const handleOnChange = () => {
    updateTodo(id);
  }

  const handleDelete = () => {
    deleteTodo(id);
  }

  return (
    <li className="todo_item">
      <input type="checkbox" id={`checkbox_${id}`} checked={done} onChange={handleOnChange} />
      <label htmlFor={`checkbox_${id}`} className="todo_desc">{desc}</label>
      <button onClick={handleDelete} className="btn_delete"><FiTrash2 /></button>
    </li>
  )
};

export default TodoItem;