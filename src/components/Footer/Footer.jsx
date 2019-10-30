import React from 'react';
import { Link } from 'react-router-dom';

import Nav from '../Nav/Nav';

const Footer = ({ auth, authenticated }) => (
  <footer className="footer">
    <p className="footer_logo">
      <Link to="/">Travel Planning App</Link>
    </p>
    <Nav auth={auth} authenticated={authenticated} />
  </footer>
);

export default Footer;
