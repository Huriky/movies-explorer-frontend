import './SavedMovies.css';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import {SearchBar} from "../SearchBar/SearchBar";

function SavedMovies() {

  return (
    <>
      <SearchBar/>
      <MoviesCardList/>
    </>
  );
}

export default SavedMovies;
