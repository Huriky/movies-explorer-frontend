import { Link } from 'react-router-dom';

import './Register.css';
import logo from '../../images/logo.svg';

function Register() {


  return (
    <div className="login">
      <div className="login__container">
        <Link to="/"><img className="login__logo" src={logo} alt="Лого" /></Link>
        <h1 className="login__title">Добро пожаловать!</h1>
        <form className="login__form">
          <label htmlFor="name" className="login__label">Имя</label>
          <input name="name" type="text" className="login__input" placeholder="Имя" required />
          <label htmlFor="email" className="login__label" >E-mail</label>
          <input name="email" type="email" className="login__input" placeholder="E-mail" required />
          <label htmlFor="password" className="login__label">Пароль</label>
          <input name="password" type="password" className="login__input" placeholder="Пароль" required />
          <button type="submit" className="login__submit">Зарегистрироваться</button>
          <p className="login__text">Уже зарегистрированы? <Link to="/signin" className="login__link">Войти</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Register;
