import React, { useState } from 'react';

import Destination from '../components/Destination';

function App() {
  const [destination, setDestination] = useState('');

  const handleChangeDestination = (e) => {
    setDestination(e.target.value);
  }

  return (
    <div className="App">
      <Destination
        destination={destination}
        handleChangeDestination={handleChangeDestination} />
    </div>
  );
}

export default App;
