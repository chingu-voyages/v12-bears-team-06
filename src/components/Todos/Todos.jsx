import React from "react";

import Loading from '../Loading/Loading';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';

import './todos.scss';

const Todos = ({ todos, loading, addTodo, updateTodo, deleteTodo }) => {
  const formatTodos = () => {
    return todos.map(todo => {
      return (
        <TodoItem
          key={todo._id}
          id={todo._id}
          desc={todo.taskDescription}
          done={todo.taskDone}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo} />
      );
    });
  };

  let todo_items = loading ? <Loading /> : todos ? <Loading /> : null;
  
  if (todos && !loading && todos) {
    todo_items = <ul className="todo_items">{formatTodos()}</ul>;
  };

  return (
    <div className="container container_todos">
      <h2 className="">Todo List</h2>
      {todo_items}
      <AddTodo addTodo={addTodo} />
    </div>
  );
};

export default Todos;