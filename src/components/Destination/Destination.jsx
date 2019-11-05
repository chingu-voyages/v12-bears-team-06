import React from "react";
import XIcon from '../UI/XIcon/XIcon';

import LoadingSm from '../Loading/LoadingSm';

import './destination.scss';

const Destination = ({ name, loading, handleOnSubmit, handleChangeDestination, clicked }) => {
  return (
    <div className="container container_destination">
      <h2 className="">Destination{loading ? <LoadingSm color="#53CBA7" /> : null}</h2>
      <form className="form_destination" onSubmit={handleOnSubmit}>
        <input
          type="text"
          value={name === 'undefined' ? '' : name}
          placeholder="Enter City Name"
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
