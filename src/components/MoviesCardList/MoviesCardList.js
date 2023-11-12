import './MoviesCardList.css';
import {FilmCard} from "../FilmCard/FilmCard";
import {useEffect, useState} from "react";

let step =  window.innerWidth > 1279 ? 16 :  window.innerWidth > 767 ? 8 : 5;

function MoviesCardList({ cards, onDelete, onAdd }) {

  const [showCards, setShowCards] = useState(cards.slice(0, step))
  const [position, setPosition] = useState(step);

  useEffect(() => {
    setShowCards(cards.slice(0, step))
  }, [cards])

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function showMore() {
    setShowCards(cards.slice(0, position + (step === 16 ? 4 : 2)));
    setPosition(position + (step === 16 ? 4 : 2));
  }

  function handleResize() {
    const { screen: { width } } = window;
    if (width > 480) step = 7;
    else step = 5;
  }

  return (
    <section className="movies-list">
      {cards.length
        ? null
        : (<p className="movies-list__alert" >
          Ничего не найдено
        </p>)}
      <div className="movies-list__container">
        {cards.length
          ? showCards.map((item) => (<FilmCard key={item.id ?? item.movieId} movie={item} onDelete={onDelete} onAdd={onAdd} />))
          : null}
      </div>
      {cards.length > position
        ? (<button type="button" onClick={showMore} className='movies-list__button'>Ещё</button>)
        : null}
    </section>
  );
}

export default MoviesCardList;
