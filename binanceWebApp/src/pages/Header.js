import React from 'react';
import './header.css'
import { Link } from 'react-router-dom';
function Header(props) {
    return (
        <div className="header">  
  <div className="header__logo">
    <Link to={'/'} style={props.name==='home'?{ color: '#f9b234'}: {color: 'white'}}><strong>HOME</strong></Link>
  </div>
  <nav className="navbar">
    <ul className="navbar__menu">
      <li className="navbar__item">
        <Link className='navbar__link ' style={props.name==='admins'?{fontSize: 14, color: '#f9b234'}: {fontSize:12}} to={'/admins'}>Admins</Link>
      </li>
      <li className="navbar__item">
      <Link className='navbar__link ' style={props.name==='users'?{fontSize: 14, color: '#f9b234'}: {fontSize:12}} to={'/users'}>Users</Link>
      </li>
      <li className="navbar__item">
      <Link className='navbar__link ' style={props.name==='traders'?{fontSize: 14, color: '#f9b234'}: {fontSize:12}} to={'/traders'}>Traders</Link>
      </li>
      
      
    </ul>
  </nav>
</div>
    );
}

export default Header;