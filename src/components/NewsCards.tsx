import { useContext, useEffect } from 'react';
import '../styles/newsCards.css';
import Card from './Card';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NewsContext from '../context/NewsContext';

function NewsCards() {
  const { cardsList, fetchAPI, handleNavbarClick, visibleCards, handleScroll } =
    useContext(NewsContext);

  const getFavorites = JSON.parse(
    localStorage.getItem('Favorite News') as string
  );

  useEffect(() => {
    fetchAPI('https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=100');
    console.log(getFavorites);
  }, []);

  useEffect(() => {
    handleScroll();
    console.log(getFavorites);
  }, [visibleCards]);

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={(e) => handleNavbarClick(e)}>
                Mais Recentes
              </Nav.Link>
              <Nav.Link onClick={(e) => handleNavbarClick(e)}>
                Releases
              </Nav.Link>
              <Nav.Link onClick={(e) => handleNavbarClick(e)}>
                Notícias
              </Nav.Link>
              <Nav.Link onClick={(e) => handleNavbarClick(e)}>
                Favoritos
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="cardslist-container">
        {cardsList.slice(0, visibleCards).map((card, index) => (
          <Card card={card} key={index} />
        ))}
      </div>
    </>
  );
}

export default NewsCards;
