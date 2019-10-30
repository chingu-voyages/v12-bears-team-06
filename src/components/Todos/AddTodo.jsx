import React, { useState } from "react";

const AddTodo = (props) => {
  const [newTodo, setNewTodo] = useState('');

  const handleInputChange = e => {
    setNewTodo(e.target.value);
  }

  const handleOnSubmit = e => {
    e.preventDefault();
    props.addTodo(newTodo);
    setNewTodo('');
  }

  return (
    <form className="todo_form" onSubmit={handleOnSubmit}>
      <input
        type="text"
        name="name"
        value={newTodo}
        onChange={handleInputChange}
        placeholder="Add todo ..." />
    </form>
  );
};

export default AddTodo;