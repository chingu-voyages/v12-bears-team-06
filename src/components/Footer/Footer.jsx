import React from 'react';
import { Link } from 'react-router-dom';
import { DiGithubBadge } from 'react-icons/di';

import Nav from '../Nav/Nav';

const Footer = ({ auth, authenticated }) => (
  <footer className="footer">
    <p className="footer_logo">
      <Link to="/">Travel Planning App</Link>
    </p>
    <Nav auth={auth} authenticated={authenticated} />
    <p className="copyright">Built by <span>Bears Team 6</span> Chingu Voyage 2019 <a href="https://github.com/chingu-voyages/v12-bears-team-06" target="_blank" className="link_git" rel="noopener noreferrer"><DiGithubBadge /></a></p>
  </footer>
);

export default Footer;
