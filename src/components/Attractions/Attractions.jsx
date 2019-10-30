import React from "react";

import Loading from '../Loading/Loading';
import AttractionItem from './AttractionItem';

import './attractions.scss';

const Attractions = ({ attractions, loading, destination }) => {
  const formatAttractions = () => {
    return attractions.map(item => {
      return (
        <AttractionItem
          key={item.name}
          name={item.name}
          img={item.img}
          url={item.url} />
      );
    });
  };

  let attraction_items = loading ? <Loading /> : destination ? <Loading /> : <p className="msg_nodestination">You haven't entered your destination yet.</p>;

  if (destination && !loading && attractions) {
    attraction_items = <ol className="attraction_items">{formatAttractions()}</ol>;
  };

  return (
    <div className="container container_attractions">
      <h2 className="">Attractions</h2>
        {attraction_items}
    </div>
  );
};

export default Attractions;
