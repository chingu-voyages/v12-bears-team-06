import React, { useState, useEffect } from 'react';

const EditTodo = (props) => {
  const [todo, setTodo] = useState(props.currentTodo);

  const handleInputChange = e => {
    const { name, value } = e.target
    setTodo({
      ...todo,
      [name]: value
    });
  }

  const handleOnSubmit = e => {
    e.preventDefault();
    props.updateTodo(todo.id, todo.desc);
  }

  useEffect(() => {
    setTodo(props.currentTodo);
  }, [props.currentTodo]);

  return (
    <form onSubmit={handleOnSubmit}>
      <input type="text" name="desc" value={todo.desc} onChange={handleInputChange} />
    </form>
  );
}

export default EditTodo;
