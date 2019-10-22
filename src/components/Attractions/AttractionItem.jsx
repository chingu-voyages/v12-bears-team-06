import React from 'react';

const AttractionItem = ({ index, name, img, url }) => {
  const imgUrl = {
    backgroundImage: `url(${img})`
  };

  return (
    <li className="attraction_item">
      <a href={url} target="_blank">
        <div className="attraction_img" style={imgUrl}></div>
        <p className="attraction_name">{name}</p>
      </a>
    </li>
  );

};

export default AttractionItem;