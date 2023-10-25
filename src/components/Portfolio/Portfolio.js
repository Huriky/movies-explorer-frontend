import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__title">Портфолио</h2>
        <div className="portfolio__links">
          <a target={'_blank'} href="https://github.com/Huriky" className="portfolio__link">Статичный сайт</a>
          <a target={'_blank'} href="https://github.com/Huriky" className="portfolio__link">Адаптивный сайт</a>
          <a target={'_blank'} href="https://github.com/Huriky" className="portfolio__link">Одностраничное приложение</a>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
