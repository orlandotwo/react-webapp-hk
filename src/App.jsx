import axios from 'axios';
import { useEffect,useState } from 'react';
import {Container,Row,Col, Form, Button, Card} from 'react-bootstrap';
import {Nav, Navbar, Offcanvas} from 'react-bootstrap';
import swal from 'sweetalert2';
import Global from './Global';
import './style.css'


export function App() {
  const [artistName, setArtistName] = useState('');
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);

  const formSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    swal.fire({
      title: 'Buscando...',
      text: 'Aguarde un momento',
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      onBeforeOpen: () => {
        swal.showLoading();
      }
    });
    try {
      const response = await axios.get(`${Global.urlArtisAlbums}?artistName=${artistName}`);
      console.log(response.data);
      setAlbums(response.data.albums);
      swal.close();
      setLoading(false);
    } catch (error) {
      swal.close();
      setLoading(false);
      swal.fire({
        title: 'Error',
        text: error.response.data.msg,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }//finally {
      
   // }
  };
  return (
    <>
    <Container fluid>
      <Navbar  bg="light" expand="md" className="mb-3">
          <Container fluid>
            <Navbar.Brand>Albums Web Project</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-md`}
              aria-labelledby={`offcanvasNavbarLabel-expand-md`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                  Buscar Artista
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Form className="d-flex" onSubmit={formSubmit}>
                    <Form.Control
                      type="text"
                      placeholder="Buscar Artista"
                      className="me-2"
                      aria-label="Search"
                      value={artistName} onChange={(event) => setArtistName(event.target.value)}
                    />
                    <Button type='submit' variant="outline-success">Buscar</Button>
                  </Form>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      
      <Row className='justify-content-center'>
        {albums.map((album) => (
          <Card key={album.id} style={{ width: '18rem', margin: '10px'}} className="album-card">
            <Card.Img variant="top" src={album.images[0].url}  className='album-image' />
            <Card.Body>
              <Card.Title>{album.name}</Card.Title>
              <Card.Subtitle className='text-muted'>{album.artists[0].name}</Card.Subtitle>
              <Card.Subtitle className='text-muted'>{album.release_date}</Card.Subtitle>
              <Card.Subtitle className='text-muted'>Popularidad {album.popularity}</Card.Subtitle>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
    </>
  );
}
