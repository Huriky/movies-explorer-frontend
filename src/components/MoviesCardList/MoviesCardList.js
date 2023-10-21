import './MoviesCardList.css';
import {FilmCard} from "../FilmCard/FilmCard";

function MoviesCardList() {

  return (
    <section className="movies-list">
      <div className="movies-list__container">
          <FilmCard/>
          <FilmCard/>
          <FilmCard/>
          <FilmCard/>
          <FilmCard/>
      </div>
      <button type="button" className='movies-list__button'>Ещё</button>
    </section>
  );
}

export default MoviesCardList;
