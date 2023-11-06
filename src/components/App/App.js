import './App.css';

import {Routes, Route, useNavigate} from 'react-router-dom';


import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import PrivateLayout from '../PrivateLayout/PrivateLayout';
import {useEffect, useState} from "react";
import { CurrentUserContext } from '../../context/CurrentUserContext';
import {MainApi} from "../../utils/MainApi";
import InfoPopup from "../InfoPopup/InfoPopup";


function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    MainApi.getUserInformation()
      .then((user) => {
        setCurrentUser(user);
        setLoggedIn(true)
      })
      .catch(() => {
        setLoggedIn(false);
        localStorage.clear();
      })
  }, []);

  useEffect(() => {
    if (loggedIn) {
      MainApi.getUserInformation()
        .then((user) => {
          setCurrentUser(user);
          setLoggedIn(true)
        })
        .catch((err) => err.then(({ message }) => showPopupError(message)))
    }
  }, [loggedIn])

  function showPopupError(message) {
    setError(message ?? 'Произошла ошибка');
    setTimeout(() => setError(null), 5000);
  }

  function handleLogin(data) {
    MainApi.authorization(data)
      .then((response) => {
        console.log(response);
        localStorage.setItem('token', response.token)
        setLoggedIn(true);
        navigate('/movies');
      })
      .catch((err) => err.then(({ message }) => showPopupError(message)))
  }

  function handleRegistration(data) {
    MainApi.registration(data)
      .then(res => {
        if (res.ok) {
          handleLogin({email: data.email, password: data.password})
        }
        else {
          return Promise.reject(res.json());
        }
      })
      .catch((err) => err().then(({ message }) => showPopupError(message)))
  }

  function handleUserDataUpdate(data) {
    return MainApi.setUserInformation(data)
      .then((user) => {
        setCurrentUser(user);
        setSuccess('Данные сохранены');
        setTimeout(() => setSuccess(null), 5000);
        return true;
      })
      .catch((err) => err.then(({ message }) => showPopupError(message)))
  }

  function handleLogout() {
        navigate('/');
        setCurrentUser({});
        setLoggedIn(false);
        localStorage.clear();
  }

  return (
    <div className="root">

      {error ? <InfoPopup message={error} /> : null}
      {success ? <InfoPopup message={success} isSuccess={true} /> : null}
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/" element={
            <>
              <Header loggedIn={loggedIn} />
              <Main />
              <Footer />
            </>
          } />
          {!loggedIn
            ? (<>
              <Route path="/signup" element={<Register onSubmit={handleRegistration} loggedIn={loggedIn} />} />
              <Route path="/signin" element={<Login onSubmit={handleLogin} loggedIn={loggedIn} />} />
            </>)
            : null}

          <Route element={<PrivateLayout loggedIn={loggedIn} />}>
            <Route path="/movies" element={
              <>
                <Header loggedIn={loggedIn} />
                <Movies onError={showPopupError} />
                <Footer />
              </>
            } />
            <Route path="/saved-movies" element={
              <>
                <Header loggedIn={loggedIn} />
                <SavedMovies onError={showPopupError} />
                <Footer />
              </>
            } />
            <Route path="/profile" element={
              <>
                <Header loggedIn={loggedIn} />
                <Profile onSubmit={handleUserDataUpdate} onOut={handleLogout} />
              </>
            } />
            <Route path="*" element={<PageNotFound />} />
          </Route>

        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
