import './Movies.css';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import {SearchBar} from "../SearchBar/SearchBar";

function Movies() {

    return (
    <>
      <SearchBar />
      <MoviesCardList />
    </>
  );
}

export default Movies;
