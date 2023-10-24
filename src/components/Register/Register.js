import { Link } from 'react-router-dom';

import './Register.css';
import logo from '../../images/logo.svg';
import main from "../Main/Main";

function Register() {


  return (
    <main>
      <div className="login">
        <div className="login__container">
          <Link to="/"><img className="login__logo" src={logo} alt="Лого" /></Link>
          <h1 className="login__title">Добро пожаловать!</h1>
          <form className="login__form">
            <span className="login__label">Имя</span>
            <input name="name" type="text" className="login__input" placeholder="Имя" required />
            <span className="login__label" >E-mail</span>
            <input name="email" type="email" className="login__input" placeholder="E-mail" required />
            <span className="login__label">Пароль</span>
            <input name="password" type="password" className="login__input" placeholder="Пароль" required />
            <button type="submit" className="login__submit" style={{marginTop: '150px'}}>Зарегистрироваться</button>
            <p className="login__text">Уже зарегистрированы? <Link to="/signin" className="login__link">Войти</Link></p>
          </form>
        </div>
      </div>
    </main>

  );
}

export default Register;
