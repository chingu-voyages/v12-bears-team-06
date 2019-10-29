import React, { useState } from "react";

import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import Backdrop from '../UI/Backdrop/Backdrop';

import loader from './loader.gif';
import './todos.scss';

const Todos = ({ todos, loading, editing, addTodo, toggleTodo, editTodo, updateTodo, deleteTodo, currentTodo }) => {

  const formatTodos = () => {
    return todos.map(todo => {
      return (
        <TodoItem
          todo={todo}
          currentTodo={currentTodo}
          key={todo._id}
          editing={editing}
          toggleTodo={toggleTodo}
          updateTodo={updateTodo}
          editTodo={editTodo}
          deleteTodo={deleteTodo} />
      );
    });
  };

  return (
    <div className="container container_todos">
      <h2 className="">Todo List{loading ? <img src={loader} alt="loading..." className="todo_loader" /> : null}</h2>
      <div className="todo_items_wrap">
        <ul className="todo_items">{formatTodos()}</ul>
        {loading ? <div className="todo_overlay"></div> : null}
      </div>
      <AddTodo addTodo={addTodo} />
    </div>
  );
};

export default Todos;