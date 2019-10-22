import React from "react";

import Loading from '../Loading/Loading';
import AttractionItem from './AttractionItem';

import './attractions.scss';

const Attractions = ({ attractions, loading, destination }) => {
  const formatAttractions = () => {
    return attractions.map((item, index) => {
      return (
        <AttractionItem
          key={item.name}
          index={index + 1}
          name={item.name}
          img={item.img}
          url={item.url}
        />
      );
    });
  };

  let attraction_items = loading ? <Loading /> : destination ? <Loading /> : <p>You don't have Destination.</p>;
  
  if (destination && !loading && attractions) {
    attraction_items = formatAttractions();
  };

  return (
    <div className="container container_attractions">
      <h2 className="">Attractions</h2>
      <ol className="attraction_items">
        {attraction_items}
      </ol>
    </div>
  );
};

export default Attractions;