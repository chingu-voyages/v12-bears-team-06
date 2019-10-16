import React from 'react';

import './loading.scss';

const Loading = () => (
  <div className='looping-rhombuses-spinner'>
    <div className='rhombus'></div>
    <div className='rhombus'></div>
    <div className='rhombus'></div>
  </div>
);

export default Loading;