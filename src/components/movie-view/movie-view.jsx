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
            window.open(`/users/${user}`, "_self");
            alert("Added to favorites!");
          });
      }
    
    render() {
        const { movie, onBackClick } = this.props;

        return (
            <Row className="main-view justify-content-md-center">
                <Col>
                
            <div className="movie-view">
                <div className="movie-title" style={{ fontSize: '36px', textTransform: 'uppercase'}}>
                    <span className="label"></span>
                    <span className="value">{movie.Title}</span>
                    <span><Button
                    style={{ marginBottom: '8px', backgroundColor: 'rgba(194, 163, 255, 0)', border: 'none', color: 'red', textDecoration: 'none' }}
                    onClick={() => this.addFavorite(movie)}
                  >
                    ❤️ 
                  </Button></span>
                </div>
                <div className="movie-description" style={{ }}>
                    <span className="label"></span>
                    <span className="value">{movie.Description}</span>
                    <br />
                    <div className="btn_zone" style={{ marginTop: '20px'}}>
                    <Button onClick={onBackClick} style={{ width: '90px' ,marginRight: '10px' ,fontSize:'20px' ,backgroundColor: 'black', border: 'none', color: 'white', textDecoration: 'none'  }} variant="link">Back</Button>
                    <Link to={`/genres/${movie.Genre.Name}`}>
                    <Button style={{width: '90px' , marginRight: '10px' ,fontSize:'20px' ,backgroundColor: '#65ACFF', border: 'none', color: '#193740', textDecoration: 'none' }} variant="link">Genre</Button>
                    </Link>
                    <Link to={`/directors/${movie.Director.Name}`}>
                    <Button style={{ width: '90px' ,marginRight: '10px' ,fontSize:'20px' ,backgroundColor: 'rgba(255, 240, 101, 0.8)', border: 'none', color: '#193740', textDecoration: 'none'  }} variant="link">Director</Button>
                    </Link>
                    </div>
                    
                </div>   
            </div>
            </Col>
            </Row>
        );
    }
}
