import './Movies.css';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import {SearchBar} from "../SearchBar/SearchBar";
import {useEffect, useState} from "react";
import Preloader from "../Preloader/Preloader";
import {MoviesApi} from "../../utils/MoviesApi";
import {MainApi} from "../../utils/MainApi";

function Movies({ onError }) {
  const [results, setResults] = useState(null);
  const [films, setFilms] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [params, setParams] = useState(null);
  const [defaultValue, setDeafultValue] = useState('')

  useEffect(() => {
  const SearchHistory = localStorage.getItem('SearchHistory');
  if (SearchHistory) {
    const savedSearch = JSON.parse(SearchHistory)
    console.log(savedSearch.params.request)
    setDeafultValue(savedSearch.params.request)
    setParams(savedSearch.params);
    setFilms(savedSearch.data);
    changeIsShort(savedSearch.params, savedSearch.data);

  }
}, [])

function changeIsShort(params, Films = films) {
  setIsLoading(true)
  if (Films) {
    setResults(null);
    const { isShort = false } = params;
    const data = Films.filter(({ duration }) => {
      return !(isShort && duration > 40);

    });
    saveResults(Films, params);
    checkSaved(data, params);
  }
  setIsLoading(false)
}

function saveResults(data, params) {
  localStorage.removeItem('SearchHistory')
  console.log(params)
  localStorage.setItem('SearchHistory', JSON.stringify({data, params}));
}

function findInName(name, request) {
  if (!name || !request) return 0;

  name = name.toLowerCase();
  request = request.toLowerCase();
  name = name.trim();
  request = request.trim();

  return name.indexOf(request) !== -1
}

function checkSaved(films, params) {
  MainApi.getMovies()
    .then((savedMovies) => {
      const data = films.map((item) => {
        const movie = savedMovies.movies.find(({ movieId, _id }) => movieId === item.id);
        if (movie) {
          item.isSaved = true;
          item.savedId = movie._id;
        } else item.isSaved = false;
        return item;
      });
      setResults(data);
    })
    .catch((err) => console.log(err));
}



async function handleSearch(params) {
    if(params.request && params.request.toString().trim().length > 0) {
      setIsLoading(true);
      setParams(params);
      setResults(null);

      let films
      try {
        films = await MoviesApi.getMovies();
      } catch({ message }) {
        onError(message);
        setIsLoading(false);
      }

      const { request, isShort } = params;

      let data = films.filter(({ duration, nameRU, nameEN }) => {

        if (findInName(nameRU, request)) return true;
        else if (findInName(nameEN, request)) return true;

        return false;
      });
      setFilms(data);
      saveResults(data, params);
      data = data.filter(({ duration }) => {
        if (isShort && duration > 40) return false;
        return true;
      });

      checkSaved(data, params);
      setIsLoading(false)
    } else {
      onError('Поле не должно быть пустым')
    }

}
  const baseUrl = 'https://api.nomoreparties.co';
function addMovie(data) {
  const { country, director, duration, year, description, image: { url }, trailerLink, id: movieId, nameRU, nameEN } = data;
  MainApi.addMovie({ country, director, duration, year, description, image: `${baseUrl}${url}`, trailer: trailerLink, movieId, nameRU, nameEN, thumbnail: trailerLink })
    .then((movie) => {
      if (movie) {
        setResults([...results.map(item => {
          if(item.id === movie.movie.movieId) {
            console.log(movie.movie)
            return {...item, isSaved: true, savedId: movie.movie._id}
          } 
          return item
        })])
        // checkSaved(results, params)
      }
    })
    .catch((err) => err.then(({ message }) => onError(message)))
}

function deleteMovie(id) {
  MainApi.deleteMovie(id)
    .then((movie) => {
      if (movie) {
        checkSaved(results, params)
      }
    })
    .catch((err) => err.then(({ message }) => onError(message)))
}

    return (
    <main>
      <SearchBar defaultValue={params?.request} onSubmit={handleSearch} onChecked={changeIsShort} />
      {isLoading ? (<Preloader />) : null}
      {results && !isLoading ? (<MoviesCardList cards={results} onDelete={deleteMovie} onAdd={addMovie} />) : null}
    </main>
  );
}

export default Movies;
