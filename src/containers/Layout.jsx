import React, { useState } from 'react';

import Destination from '../components/Destination';

const Layout = () => {
  const [destination, setDestination] = useState('');

  const handleChangeDestination = (e) => {
    setDestination(e.target.value);
  }

  return (
    <div className="">
      <Destination
        destination={destination}
        handleChangeDestination={handleChangeDestination} />
    </div>
  );
}

export default Layout;