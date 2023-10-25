import './Header.css';

import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn }) {
  const location = useLocation();

  const elementLogin = (
    <div className="header__login-container">
      <Link to="/signup" className="header__link">Регистрация</Link>
      <Link to="/signin" className="header__button">Войти</Link>
    </div>
  );

  return (
    <header className={`${location.pathname === '/' ? "header_color_dark-green" : null} header`}>
      <div className="header__container">
        <Link to="/" className="header__logo"></Link>

        {loggedIn ? (<Navigation />) : elementLogin}
      </div>
    </header>
  );
}

export default Header;
