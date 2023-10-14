import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import shareIcon from '../assets/shareIcon.svg';
import whiteHeart from '../assets/whiteHeartIcon.svg';
// import blackHeart from '../assets/blackHeartIcon.svg'
import '../styles/newsCards.css';
import NewsContext from '../context/NewsContext';
import { CardPropsType } from '../types';

function Card({ card }: CardPropsType) {
  const { handleClickCopy, isCopied, transformDate } = useContext(NewsContext);
  // const [isFavorite, setIsFavorite] = useState(false)
  // const [favoriteCards, setFavoriteCards] = useState([])

  // const handleClickFavorite = (path: string, id: string) => {
  //   if (recipeDetailsAPI && !favorites.some((favorite) => favorite.id === id)) {
  //     const newFavorite = [...favorites, {
  //       id,
  //       type: path === 'meals' ? 'meal' : 'drink',
  //       nationality: path === 'meals' ? recipeDetailsAPI.strArea : '',
  //       category: recipeDetailsAPI?.strCategory ? recipeDetailsAPI.strCategory : '',
  //       alcoholicOrNot: path === 'meals' ? '' : recipeDetailsAPI.strAlcoholic,
  //       name: path === 'meals' ? recipeDetailsAPI.strMeal : recipeDetailsAPI.strDrink,
  //       image: path === 'meals' ? recipeDetailsAPI.strMealThumb
  //         : recipeDetailsAPI.strDrinkThumb,
  //     }];
  //     setFavorites(newFavorite);
  //     return localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
  //   }
  //   const removeFavorite = favorites.filter((favorite) => favorite.id !== id);
  //   setFavorites(removeFavorite);
  //   return localStorage.setItem('favoriteRecipes', JSON.stringify(removeFavorite));
  // };

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
          <button className="fav-share">
            <img src={ whiteHeart } alt="Heart" />
          </button>
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
