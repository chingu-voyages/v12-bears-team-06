import React from 'react';

const AttractionItem = ({ index, name, category, tags }) => {
  const tagItems = tags.map((tag, index) => {
    return (
      <li key={tag}>{tag}</li>
    );
  });

  return (
    <li className="attraction_item">
      <p className="attraction_rank">{index}</p>
      <div className="attraction_text">
        <p className="attraction_name">{name}</p>
        <p className="attraction_cat">{category}</p>
        <ul className="attraction_tag">{tagItems}</ul>
      </div>
    </li>
  );

};

export default AttractionItem;