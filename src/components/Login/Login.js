import { Link } from 'react-router-dom';

import './Login.css';
import logo from '../../images/logo.svg';

function Login() {

  return (
    <main>
      <div className="login">
        <div className="login__container">
          <Link to="/"><img className="login__logo" src={logo} alt="Лого" /></Link>
          <h1 className="login__title">Рады видеть!</h1>
          <form className="login__form">
            <span className="login__label">E-mail</span>
            <input name="email" type="email" className="login__input" required />
            <span className="login__label" >Пароль</span>
            <input name="password" type="password" className="login__input" required />
            <button className="login__submit">Войти</button>
            <p className="login__text">Ещё не зарегистрированы? <Link to="/signup" className="login__link">Регистрация</Link></p>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Login;
