import { useContext, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/highlights.css';
import NewsContext from '../context/NewsContext';
import Card from './Card';

function Highlights() {
  const { transformImg, fetchAPI, highlightsList, isLoading } =
    useContext(NewsContext);

  useEffect(() => {
    fetchAPI('https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=100');
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="carousel-container">
      <Carousel>
        {highlightsList.length > 0 &&
          highlightsList.map((highlight, index) => (
            <Carousel.Item key={highlight.id} interval={10000}>
              <img
                className="highlight-img"
                src={transformImg(highlight.imagens)}
                alt={highlight.titulo}
              />
              <Card card={highlight} key={index} />
            </Carousel.Item>
          ))}
      </Carousel>
    </div>
  );
}

export default Highlights;
