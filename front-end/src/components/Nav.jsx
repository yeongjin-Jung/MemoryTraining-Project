/* eslint-disable */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdCreateNewFolder } from 'react-icons/md';

const Navigator = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        암기의 정석
      </Link>
      <div className="menu-icon" onClick={handleClick}>
        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
      </div>
      <ul className={click ? 'nav-menu active' : 'nav-menu'}></ul>
    </nav>
  );
};

export default Navigator;
