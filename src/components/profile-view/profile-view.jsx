import React from 'react';
import axios from "axios";
import Button from 'react-bootstrap/Button'
import dateFormat from 'dateformat';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/Container";
import './profile-view.scss'

import { Link } from "react-router-dom";

export class ProfileView extends React.Component {

    constructor() {
      super();
      this.state = {
        name: "",
        password: "",
        email: "",
        birthday: "",
        favoriteMovies: []
      }
    };

    componentDidMount() {
      let accessToken = localStorage.getItem('token');
      this.getUser(accessToken);
    }

    getUser(token) {
      let url =
        'https://gamingmovies.herokuapp.com/users/' +
        localStorage.getItem('user');
      axios
        .get(url, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.setState({
            name: response.data.Name,
            password: response.data.Password,
            email: response.data.Email,
            birthday: response.data.Birthday,
            favoriteMovies: response.data.FavoriteMovies,
          });
        });
    }

    removeFavorite(movie) {
      let token = localStorage.getItem("token");
      let url =
      'https://gamingmovies.herokuapp.com/users/' +
        localStorage.getItem('user') +
        '/Movies/' +
        movie._id;
      axios
        .delete(url, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          alert('Movie has been removed');
          this.componentDidMount();
        });
    }

    deleteUser() {
      let token = localStorage.getItem("token");
      let user = localStorage.getItem("user");
      axios.delete(
          `https://gamingmovies.herokuapp.com/users/${user}`, { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          alert(user + " was deleted");
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          window.location.pathname = "/";
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  
    
    render() {
      const { userData, movies } = this.props;
      const { name } = this.state;
      const favoriteMovieList = movies.filter((movie) => {
        return this.state.favoriteMovies.includes(movie._id);
      });

        return (
          <Container>
          <Row>
          <Col>
          <div className="profile-view" style={{ fontSize: '28px', textAlign: 'center', padding: '20px'}}>
              <div className="profile-info" style={{padding: '30px'}}>
                <h3>Username: {name}</h3>
                  <div style={{paddingTop: '20px'}}>
                  <Link to={`/`}>
                <Button style={{ width: '100px' ,fontSize: '20px' ,backgroundColor: 'black', border: 'none', textDecoration: 'none', color: 'white' }} >
                  Back
                </Button>
                </Link>
                <Link to={`/update/${userData}`}>
                <Button style={{ width: '100px' ,fontSize: '20px' ,backgroundColor: 'white', border: 'none', textDecoration: 'none', color: 'black' }} variant="link">
                  Update Profile
                </Button>
                </Link>
                <Button style={{ width: '115px' ,fontSize: '20px' ,backgroundColor: 'white', border: 'none', textDecoration: 'none', color: 'black' }} onClick={() => { this.deleteUser() }} >Delete Profile</Button>
                </div>
              </div>
              <div className="favoritemovie-view">
                <h2 style={{ width: '100%', backgroundColor: '#FFDD65', borderRadius: '4px'}}>Favorite Movies</h2>

                {favoriteMovieList.map((movie) => {
            return (
              <Row  style={{ margin: '0 auto', justifyContent: 'center'}}>
              <Col md={2.5} key={movie._id}>
                <Card className="profilecard" style={{ border: 'none'}}>
                  <Card.Img variant="top" src="https://picsum.photos/200/300" style={{ height: '160px'}} />
                  <Card.Body style={{backgroundColor: 'rgba(255, 255, 255, 0.6)'}}>
                    <Link to={`/movies/${movie._id}`}>
                      <Card.Title style={{ marginTop: '10px', fontSize: '24px', color: '#193740' }}>{movie.Title}</Card.Title>
                    </Link>
                  </Card.Body>
                </Card>
                <div>
                <Button style={{ width: 'auto' ,fontSize: '15px' ,backgroundColor: 'black', border: 'none', textDecoration: 'none', color: 'white' }} onClick={() => this.removeFavorite(movie)} >
                  Remove
                </Button>
                </div>
              </Col>
              </Row>
            );
          })}
              </div>
                </div>
          </Col>
          </Row>
          </Container>
        );
    }
}
