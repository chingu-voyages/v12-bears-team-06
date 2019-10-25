import React from 'react';
import { FiExternalLink } from 'react-icons/fi';

const AttractionItem = ({ name, img, url }) => {
  const imgUrl = {
    backgroundImage: `url(${img})`
  };

  return (
    <li className="attraction_item">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <div className="attraction_img" style={imgUrl}>
          <span className="externallink">
            <FiExternalLink />
          </span>
        </div>
        <p className="attraction_name">{name}</p>
      </a>
    </li>
  );

};

export default AttractionItem;
