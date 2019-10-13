import React from 'react';

const Destination = ({ destination, handleChangeDestination }) => {
  return(
    <div className="container container_destination">
      <h2 className="">Destination</h2>
      <input
        type="text"
        value={destination}
        placeholder="Type your destination ..."
        onChange={handleChangeDestination} />
    </div>
  )
};

export default Destination;
