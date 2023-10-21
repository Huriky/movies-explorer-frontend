import React from 'react'
import image from '../../images/text__COLOR_landing-logo.svg'
import './Promo.css'

const Promo = () => {
  return (
    <section className={'promo'}>
      <div className="promo__container">
        <h1 className={'promo__title'}>Учебный проект студента факультета Веб-разработки.</h1>
        <img src={image} alt="" className={'promo__image'}/>
      </div>
    </section>
  )
}

export default Promo;
