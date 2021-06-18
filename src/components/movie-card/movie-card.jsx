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
  
          
          <Card  className="card">
            <Card.Img className="cardimg" variant="top" src={movie.ImagePath}/>
             <Card.Body >
              <Card.Title className="cardtitle">{movie.Title}</Card.Title>
              <Link to={`/movies/${movie._id}`}>
               <Button className="btn_details" variant="link">View Details</Button>
               </Link>
              </Card.Body>
           </Card>

    );
  }
}