import React from "react";
import XIcon from '../UI/XIcon/XIcon';
import './destination.scss';

const Destination = ({ name, handleOnSubmit, handleChangeDestination, clicked }) => {
  return (
    <div className="container container_destination">
      <h2 className="">Destination</h2>
      <form className="form_destination" onSubmit={handleOnSubmit}>
        <input
          type="text"
          value={name === 'undefined' ? '' : name}
          placeholder="Enter your destination ..."
          onChange={handleChangeDestination}
        />
        <XIcon clicked={clicked}
          destination={'destination'}/>
        <button>Update Destination</button>
      </form>
    </div>
  );
};

export default Destination;
