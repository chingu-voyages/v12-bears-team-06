import React from "react";

import Loading from '../Loading/Loading';
import AttractionItem from './AttractionItem';

import './attractions.scss';

const Attractions = ({ attractions, loading, destination }) => {
  const formatAttractions = () => {
    return attractions.map((item, index) => {
      return (
        <AttractionItem
          key={item.id}
          index={index + 1}
          name={item.name}
          category={item.category}
          tags={item.tags}
        />
      );
    });
  };

  let attraction_items = loading ? <Loading /> : destination ? <Loading /> : <p>You don't have Destination.</p>;
  
  if (destination && !loading && attractions) {
    attraction_items = <ul className="attraction_items">{formatAttractions()}</ul>;
  };

  return (
    <div className="container container_attractions">
      <h2 className="">Attractions</h2>
      <ul className="attraction_items">
        <li className="attraction_item_head">
          <p className="attraction_rank">Rank</p>
          <div className="attraction_text">
            <p className="attraction_name">Name</p>
            <p className="attraction_cat">Category</p>
            <p className="attraction_tag">Tags</p>
          </div>
        </li>
        {attraction_items}
      </ul>
    </div>
  );
};

export default Attractions;