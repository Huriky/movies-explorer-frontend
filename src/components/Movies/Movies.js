import './Movies.css';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import {SearchBar} from "../SearchBar/SearchBar";

function Movies() {

    return (
    <main>
      <SearchBar />
      <MoviesCardList />
    </main>
  );
}

export default Movies;
