import React from 'react';
import {Link} from 'react-router-dom';

const Nav = (props) => {

  let planLink = (
    <li>
      <Link to="/board">Plan your trip</Link>
    </li>
  )
  if(!props.authenticated) {
    planLink = ( 
      <li onClick={props.auth}>Plan your trip</li>
    )
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/">About</Link>
        </li>
        <li>
          <Link to="/">Blog</Link>
        </li>
        {planLink}
      </ul>
    </nav>
  )
}

export default Nav;
