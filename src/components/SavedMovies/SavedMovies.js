import './SavedMovies.css';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import {SearchBar} from "../SearchBar/SearchBar";
import {useEffect, useState} from "react";
import {MainApi} from "../../utils/MainApi";

function SavedMovies({ onError }) {
  const [results, setResults] = useState(null);
  const [films, setFilms] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getSavedMovies();
  }, [])

  useEffect(() => console.log(results))

  function changeIsShort(params, Films = films) {
    setIsLoading(true)
    setResults(null);
    if (Films) {
      const { isShort = false } = params;
      const data = Films.filter(({ duration }) => {
        if (isShort && duration > 40) return false;
        return true;
      });
      setResults(data)
    }
    setTimeout(() => setIsLoading(false), 500)
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

  function handleSearch(params) {
    const { request, isShort } = params;
    console.log(films)
    let data = films.filter(({ duration, nameRU, nameEN }) => {

      if (findInName(nameRU, request)) return true;
      else if (findInName(nameEN, request)) return true;

      return false;
    });
    setFilms(data)
    changeIsShort(params, data);

  }

  function getSavedMovies() {
    setResults(null);
    MainApi.getMovies()
      .then((movies) => {
        if (movies.movies.length) {
          setResults(movies.movies);
            setFilms(movies.movies)
        }
      })
  }

  function deleteMovie(id) {
    MainApi.deleteMovie(id)
      .then(() => {
        getSavedMovies()
      })
      .catch((err) => err.then(({ message }) => onError(message)));
  }

  return (
    <main>
      <SearchBar onSubmit={handleSearch} onChecked={changeIsShort}/>
      {results && !isLoading ? (<MoviesCardList cards={results} onDelete={deleteMovie} />) : null}
    </main>
  );
}

export default SavedMovies;
