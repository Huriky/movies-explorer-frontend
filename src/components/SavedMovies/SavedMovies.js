import './SavedMovies.css';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import {SearchBar} from "../SearchBar/SearchBar";

function SavedMovies() {

  return (
    <main>
      <SearchBar/>
      <MoviesCardList/>
    </main>
  );
}

export default SavedMovies;
