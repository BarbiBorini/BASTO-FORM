import React from 'react';
import Logo from '../../images/logo-main.png'
import "./header.css";

function Header() {
  return (
    <div className='header'>
      <div className='logo'>
        <img className="logo-img" src={Logo} alt="Bastó"/>
      </div>
      <ul>
        <li className='header-icons'><i className="fa-solid fa-bell"></i></li>
        <li className='header-icons'><i className="fa-solid fa-right-from-bracket"></i></li>
      </ul>
    </div>
  )
}

export default Header