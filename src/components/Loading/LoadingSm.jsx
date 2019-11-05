import React from 'react';

import './loading.scss';

const LoadingSm = props => {
  const style = {
    borderLeftColor: props.color
  };

  return (
    <div class="loader" style={style}>
      Loading...
    </div>
  );
};

export default LoadingSm;
