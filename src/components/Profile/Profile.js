import './Profile.css';
import main from "../Main/Main";

function Profile() {


  return (
    <main>
      <form className="profile">
        <div className="profile__container">
          <h1 className="profile__title">{`Привет, Виталий!`}</h1>
          <div className="profile__item">
            <span className="profile__label">Имя</span>
            <p className="profile__text">Виталий</p>
          </div>
          <div className="profile__item">
            <span className="profile__label">E-mail</span>
            <p className="profile__text">email@yandex.ru</p>
          </div>
        </div>
        <div className="profile__menu">
          <button type="button" className="profile__button">Редактировать</button>
          <button type="button" className="profile__button profile__button_dangerous">Выйти из аккаунта</button>
        </div>
      </form >
    </main>
  );
}

export default Profile;
