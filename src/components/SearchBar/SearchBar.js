import React, {useState} from 'react'
import './SearchBar.css'

export const SearchBar = () => {

  const [active, setActive] = useState(true)

  const [focused, setFocus] = useState(false)

  return (
    <section className={'searchbar'}>
      <div className="searchbar__container">
        <div className={`searchbar__content ${focused ? 'focused' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M18.7929 18.2638C17.361 19.6957 15.0394 19.6957 13.6075 18.2638C12.1755 16.8318 12.1755 14.5102 13.6075 13.0783C15.0394 11.6464 17.361 11.6464 18.7929 13.0783C20.2248 14.5102 20.2248 16.8318 18.7929 18.2638ZM19.2333 19.6467C17.2731 21.1461 14.4575 20.9994 12.6647 19.2066C10.712 17.254 10.712 14.0881 12.6647 12.1355C14.6173 10.1829 17.7831 10.1829 19.7357 12.1355C21.5285 13.9283 21.6753 16.7437 20.1761 18.7039L23.7428 22.2706L22.8 23.2134L19.2333 19.6467Z" fill="#959595"/>
          </svg>
          <input onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} placeholder={'Фильмы'} type="text" className={'searchbar__input'}/>
          <button className={'searchbar__search'}>Найти</button>
          <div className={'searchbar__filter'}>
            <div className={'searchbar__checkBox'} onClick={() => setActive(!active)}>
              {
                active ?
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="20" viewBox="0 0 36 20" fill="none">
                    <rect width="36" height="20" rx="10" fill="#343434"/>
                    <circle cx="26" cy="10" r="8" fill="#2BE080"/>
                    <circle cx="26" cy="10" r="7.5" stroke="white"/>
                  </svg> :
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="20" viewBox="0 0 36 20" fill="none">
                    <rect width="36" height="20" rx="10" fill="#343434"/>
                    <circle cx="10" cy="10" r="8" fill="#A0A0A0"/>
                    <circle cx="10" cy="10" r="7.5" stroke="white"/>
                  </svg>
              }
            </div>
            Короткометражки
          </div>
        </div>
        <div className={`${'searchbar__filter'} ${'mob'}`}>
          <div className={'searchbar__checkBox'} onClick={() => setActive(!active)}>
            {
              active ?
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="20" viewBox="0 0 36 20" fill="none">
                  <rect width="36" height="20" rx="10" fill="#343434"/>
                  <circle cx="26" cy="10" r="8" fill="#2BE080"/>
                  <circle cx="26" cy="10" r="7.5" stroke="white"/>
                </svg> :
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="20" viewBox="0 0 36 20" fill="none">
                  <rect width="36" height="20" rx="10" fill="#343434"/>
                  <circle cx="10" cy="10" r="8" fill="#A0A0A0"/>
                  <circle cx="10" cy="10" r="7.5" stroke="white"/>
                </svg>
            }
          </div>
          Короткометражки
        </div>
        <span className='searchbar__line'/>
      </div>
    </section>
  )
}
