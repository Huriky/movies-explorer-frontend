import './Profile.css';
import { useContext, useState } from 'react';
import { CurrentUserContext } from "../../context/CurrentUserContext";

const regEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;
function Profile({ onSubmit, onOut }) {

  const [edit, setEdit] = useState(false)
  const [isValid, setIsValid] = useState({});
  const [errors, setErrors] = useState({});

  function checkValid(name, value) {
    if (name === 'email') {
      if (regEmail.test(value)) {
        setIsValid({ ...isValid, email: true })
        setErrors({ ...errors, email: '' })
      } else {
        setIsValid({ ...isValid, email: false })
        setErrors({ ...errors, email: 'Введите email' })
      }
    }
  }

  const currentUser = useContext(CurrentUserContext);
  const [data, setData] = useState({
    name: currentUser.user.name,
    email: currentUser.user.email,
  });

  function handleChange(e) {
    const { target: { name, value } } = e;
    setData({ ...data, [name]: value });
    checkValid(name, value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (await onSubmit(data)) {
      setEdit(false);
    }
  }

  return (
    <main>
      <form className="profile" onSubmit={handleSubmit}>
        <div className="profile__container">
          <h1 className="profile__title">{`Привет, Виталий!`}</h1>
          <div className="profile__item">
            <span className="profile__label">Имя</span>
            {edit
              ? (<input type="text" name="name" className="profile__input" onChange={handleChange} value={data.name} required />)
              : (<p className="profile__text">{data.name}</p>)}
          </div>
          <div className="profile__item">
            <span className="profile__label">E-mail</span>
            {edit
              ? (<>
                <input type="email" name="email" className="profile__input" onChange={handleChange} value={data.email} required />

              </>)
              : (<p className="profile__text">{data.email}</p>)}
          </div>
        </div>
        {
          (errors.email && edit) &&
          <p className='profile__error'>{errors.email}</p>
        }
        <div className="profile__menu">
          {
            edit ?
              <button type={'submit'} className='profile__button_save' disabled={(data.name === currentUser.user.name && data.email === currentUser.user.email) || !isValid.email}>Сохранить</button> :
              <>
                <button onClick={(e) => {
                  e.preventDefault()
                  setEdit(true)
                }} type="button" className="profile__button">Редактировать</button>
                <button onClick={onOut} type="button" className="profile__button profile__button_dangerous">Выйти из аккаунта</button>
              </>
          }

        </div>
      </form >
    </main>
  );
}

export default Profile;
