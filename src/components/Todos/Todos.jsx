import React from "react";
import CustomScroll from "react-custom-scroll";
import "./customScroll.css";

import TodoItem from './TodoItem';
import AddTodo from './AddTodo';

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

  let todo_items = loading ? null : todos.length > 0 ? null : <p className="msg_nodestination">Let's add todos!</p>;

  if (todos.length > 0) {
    todo_items = (
      <CustomScroll
        className="todo_scrollbar"
        heightRelativeToParent="200px">
        <ul className="todo_items">{formatTodos()}</ul>
      </CustomScroll>
    )
  }

  return (
    <div className="container container_todos">
      <h2 className="">Todo List{loading ? <img src={loader} alt="loading..." className="todo_loader" /> : null}</h2>
      <div className="todo_items_wrap">
        {todo_items}
        {loading ? <div className="todo_overlay"></div> : null}
      </div>
      <AddTodo addTodo={addTodo} />
    </div>
  );
};

export default Todos;