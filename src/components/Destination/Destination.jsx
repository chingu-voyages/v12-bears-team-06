import React from "react";

import './destination.scss';

const Destination = ({ name, handleOnSubmit, handleChangeDestination }) => {
  return (
    <div className="container container_destination">
      <h2 className="">Destination</h2>
      <form className="form_destination" onSubmit={handleOnSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Type your destination ..."
          onChange={handleChangeDestination}
        />
        <button>Update Destination</button>
      </form>
    </div>
  );
};

export default Destination;
