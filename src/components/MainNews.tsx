import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/mainNews.css';
import { Link } from 'react-router-dom';
import { ReportType } from '../types';
import shareIcon from '../assets/shareIcon.svg';
import whiteHeart from '../assets/whiteHeartIcon.svg';

function MainNews() {
  const [apiData, setApiData] = useState<ReportType[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const URL = 'https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=100';
    const getApi = async () => {
      const data = await fetch(URL);
      const response = await data.json();
      setApiData(response.items.slice(0, 4));
      setLoading(false);
      return response;
    };
    getApi();
  }, []);

  const transformImg = (imgJson: string) => {
    const jsonObj = JSON.parse(imgJson);
    const imgURL = jsonObj.image_intro;
    return `https://agenciadenoticias.ibge.gov.br/${imgURL}`;
  };

  function transformDate(date: string) {
    const splitDate = date.split('/');
    const formattedDate = `${splitDate[1]}/${splitDate[0]}/${splitDate[2]}`;
    const reportDate = new Date(formattedDate);
    const todayDate = new Date();
    const dateRange = Number(todayDate) - Number(reportDate);
    const result = Math.floor(dateRange / (1000 * 60 * 60 * 24));
    return result > 1 ? `${result} dias atrás` : `${result} dia atrás`;
  }

  const handleClickCopy = async (link: string) => {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="carousel-container">
      <Carousel>
        {apiData.length > 0
        && apiData.map((report) => (
          <Carousel.Item key={ report.id } interval={ 10000 }>
            <img
              className="testimonial-images"
              src={ transformImg(report.imagens) }
              alt={ report.titulo }
            />

            <div className="subtitle-container">
              <p className="destaques">Destaques</p>
              <div>
                { copied && <span className="copied">Link copiado!</span>}
                <button
                  className="fav-share"
                  onClick={ () => handleClickCopy(report.link) }
                >
                  <img src={ shareIcon } alt="" />
                </button>
                <button className="fav-share">
                  <img src={ whiteHeart } alt="White Heart" />
                </button>
              </div>
            </div>

            <h3>{ report.titulo }</h3>
            <p>{ report.introducao }</p>

            <div className="report-info">
              <p className="publi-date">
                { transformDate(report.data_publicacao) }
              </p>
              <Button variant="success">
                <Link to={ report.link } className="details-btn">
                  Detalhes
                </Link>
              </Button>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default MainNews;
