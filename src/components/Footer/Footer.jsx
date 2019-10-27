import React from 'react';

import Nav from '../Nav/Nav';

const Footer = ({ auth, authenticated }) => (
  <footer className="footer">
    <p className="footer_logo">Travel Planning App</p>
    <Nav auth={auth} authenticated={authenticated} />
  </footer>
);

export default Footer;
