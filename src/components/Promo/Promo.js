import React from 'react'
import image from '../../images/text__COLOR_landing-logo.svg'
import imageMob from '../../images/text__COLOR_landing-logo-mob.svg'
import './Promo.css'

const Promo = () => {
  return (
    <section className={'promo'}>
      <div className="promo__container">
        <h1 className={'promo__title'}>Учебный проект студента факультета Веб-разработки.</h1>
        <img src={image} alt="промо фото" className={'promo__image'}/>
        <img src={imageMob} alt="промо фото" className={'promo__image_mob'}/>
      </div>
    </section>
  )
}

export default Promo;
