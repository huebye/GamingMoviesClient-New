import React from 'react';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import './movie-view.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Link } from "react-router-dom";

export class MovieView extends React.Component {
    constructor() {
        super();
    
        this.state = {};
      }
    
      addFavorite(movie) {
        let token = localStorage.getItem("token");
        let url =
          "https://gamingmovies.herokuapp.com/users/" +
          localStorage.getItem("user") +
          "/movies/" +
          movie._id;
    
        console.log(token);
    
        axios
          .patch(url, "", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            console.log(response);
            // window.open("/", "_self");
            alert("Added to favorites!");
          });
      }
    
    render() {
        const { movie, onBackClick } = this.props;

        return (
            <Row className="main-view justify-content-md-center">
                <Col>
                
            <div className="movie-view">
                <div className="movie-title">
                    <span className="label"></span>
                    <span className="value">{movie.Title}</span>
                    <span><Button
                    className="btn_heart"
                    onClick={() => this.addFavorite(movie)}
                  >
                    ❤️ 
                  </Button></span>
                </div>
                <div className="movie-description" style={{ }}>
                    <span className="label"></span>
                    <span className="value">{movie.Description}</span>
                    <br />
                    <div className="btn_zone">
                    <Button className="btn_back" onClick={onBackClick} variant="link">Back</Button>
                    <Link to={`/genres/${movie.Genre.Name}`}>
                    <Button className="btn_genre" variant="link">Genre</Button>
                    </Link>
                    <Link to={`/directors/${movie.Director.Name}`}>
                    <Button className="btn_director" variant="link">Director</Button>
                    </Link>
                    </div>
                    
                </div>   
            </div>
            </Col>
            </Row>
        );
    }
}
