import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import shareIcon from '../assets/shareIcon.svg';
import whiteHeart from '../assets/whiteHeartIcon.svg';
import blackHeart from '../assets/blackHeartIcon.svg'
import '../styles/newsCards.css';
import NewsContext from '../context/NewsContext';
import { CardPropsType, ReportType } from '../types';
import { readFavoriteNews, saveFavoriteNews } from '../services/favorites';

function Card({ card }: CardPropsType) {
  const { handleClickCopy, isCopied, transformDate, setCardsList, isFavoriteTab} = useContext(NewsContext);
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const favoriteNews = readFavoriteNews();
    setIsFavorite(favoriteNews.some((report) => report.id === card.id));
  }, [card]);

  const setFavoriteNews = (card: ReportType, favoriteTab: boolean) => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    const favoriteNews = readFavoriteNews();
    
    if (!isFavorite) {
      saveFavoriteNews([...favoriteNews, card]);
    } else {
      saveFavoriteNews(favoriteNews.filter((report: ReportType) => report.id !== card.id));
    }

    if (isFavoriteTab) setCardsList(JSON.parse(localStorage.getItem('Favorite News') as string));
  }

  return (
    <div>
      <div className="card-container">
        <h3>{card.titulo}</h3>
        <p>{card.introducao}</p>
        <span className="publi-date">
          {transformDate(card.data_publicacao)}
        </span>
        <div className="cards-btns">
          {isCopied && <span className="copied">Link copiado!</span>}
          <button
            className="fav-share"
            onClick={() => handleClickCopy(card.link)}
          >
            <img src={shareIcon} alt="" />
          </button>

          <label htmlFor={ card.titulo }>
        <input
          type="checkbox"
          name="favoriteTrack"
          id={ card.titulo }
          onChange={ () => setFavoriteNews(card) }
          checked={ isFavorite }
        />
        <img src={ isFavorite? blackHeart: whiteHeart } alt="favorite" />
      </label>

          <Button variant="success">
            <Link to={card.link} className="details-btn">
              Detalhes
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Card;
