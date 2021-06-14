import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../movie-card/movie-card.scss'

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
      const { movie } = this.props;

    return ( 
      <Row className="main-view justify-content-md-center">
        
        <Col >
          <Card style={{ width: '340px', margin: '10px', border: 'none', minHeight: '500px', backgroundColor: 'rgba(255, 255, 255, 0.2)', boxShadow: '5px -5px 10px rgba(25, 55, 64, 0.3)'}}>
            <Card.Img variant="top" src="https://picsum.photos/200/300" style={{ height: '360px'}}/>
             <Card.Body >
              <Card.Title style={{ fontSize: '24px', color: '#193740' }}>{movie.Title}</Card.Title>
              <Link to={`/movies/${movie._id}`}>
               <Button style={{ textDecoration: 'none' ,color: 'white' ,fontSize:'20px' , position: 'absolute', top: '448px', left: '225px',backgroundColor: 'rgba(194, 163, 255, 1)', border: 'none' }} variant="link">View Details</Button>
               </Link>
              </Card.Body>
           </Card>
          </Col>
      </Row>
    );
  }
}