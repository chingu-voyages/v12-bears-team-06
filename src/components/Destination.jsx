import React from 'react';

const Destination = ({ destination, handleChangeDestination }) => {
  return(
    <div className="">
      <label>Destination: </label>
      <input
        type="text"
        value={destination}
        placeholder="Type your destination ..."
        onChange={handleChangeDestination} />
    </div>
  )
};

export default Destination;
