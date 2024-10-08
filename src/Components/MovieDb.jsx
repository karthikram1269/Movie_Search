import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const MovieDb = () => {
  let [api, setapi] = useState([]);
  let [search, SetSearch] = useState("")
  let navigate = useNavigate();

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/trending/movie/day?&api_key=67d677534400e8f77ddab93fff4be1d8&language=en-US')
      .then((y) => y.json()).then(x => setapi(x.results))
      .catch(err => console.error('error', err))
  }, [])

  function Mysearch() {
    fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&api_key=67d677534400e8f77ddab93fff4be1d8`)
    .then(res=>res.json())
    .then(x=>setapi(x.results))
    .catch(err => console.error('error', err))
  }

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Link</Nav.Link>
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#" disabled>
                Link
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e)=>SetSearch(e.target.value)}
              />
              <Button variant="outline-success" onClick={Mysearch}>Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Carousel>
        {api.map((x,index) => {
          return (
              <div key={index}>
                <img src={`https://image.tmdb.org/t/p/original/${x.backdrop_path}`} /> 
                <p className="legend">{x.title}</p>
                <br/>
                <p>Overview:{x.overview}</p>
              </div>
          )
        })}
      </Carousel>
      <section style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
  {
    api.map((x, index) => {
      return (
       <div key={index}>
         <Card key={`${x.id}-${index}`} style={{ width: '18rem', backgroundColor: 'whiteSmoke' }}>
          <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original/${x.backdrop_path}`} />
          <Card.Body>
            <Card.Title>{x.title}</Card.Title>
            <Card.Text>{x.overview}</Card.Text>
            <Button variant="primary" onClick={() => navigate("/movie", { state: { x } })}>
              More Details 
            </Button>
          </Card.Body>
        </Card>
       </div>
      );
    })
  }
</section>

    </div>
  )
}

export default MovieDb



