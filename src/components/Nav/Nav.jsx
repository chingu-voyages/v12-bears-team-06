import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const Nav = (props) => {

  let planLink = (
    <li>
      <Link to="/board">Log in</Link>
    </li>
  )
  if(!props.authenticated) {
    planLink = ( 
      <li onClick={props.auth}>Log in</li>
    )
  }

  return (
    <nav>
      <ul>
        <li>
          <HashLink to="#about" smooth onClick={props.clicked}>About</HashLink>
        </li>
        {planLink}
      </ul>
    </nav>
  )
}

export default Nav;
