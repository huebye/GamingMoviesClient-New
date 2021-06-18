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
          localStorage.removeItem("userBirthday");
          localStorage.removeItem("userEmail");
          window.location.pathname = "/";
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  
    
    render() {
      const { userData, movies } = this.props;
      const { name, email, birthday } = this.state;
      const favoriteMovieList = movies.filter((movie) => {
        return this.state.favoriteMovies.includes(movie._id);
      });

        return (
          <Container>
          <Row>
          <Col>
          <div className="profile-view">
              <div className="profile-info">
                <h3>Username: {name}</h3>
                <h3>Email: {email}</h3>
                <h3>Birtday: {dateFormat(birthday, "mmmm dS, yyyy")}</h3>
                  <div style={{paddingTop: '20px'}}>
                  <Link to={`/`}>
                <Button className="btn_back" >
                  Back
                </Button>
                </Link>
                <Link to={`/update/${userData}`}>
                <Button className="btn_update" variant="link">
                  Update Profile
                </Button>
                </Link>
                <Button className="btn_delete" onClick={() => { this.deleteUser() }} >Delete Profile</Button>
                </div>
              </div>
              <div className="favoritemovie-view">
                <h2 >Favorite Movies</h2>

                {favoriteMovieList.map((movie) => {
            return (
              
              <Row  style={{ margin: '0 auto', justifyContent: 'center'}}>
              <Col md={2.5} key={movie._id}>
                <Card className="profilecard">
                  <Card.Img className="cardimg" variant="top" src={movie.ImagePath} />
                  <Card.Body className="cardbody">
                    <Link className="cardbody" to={`/movies/${movie._id}`}>
                      <Card.Title className="cardtitle">{movie.Title}</Card.Title>
                    </Link>
                  </Card.Body>
                </Card>
                <div>
                <Button className="btn_remove" onClick={() => this.removeFavorite(movie)} >
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
