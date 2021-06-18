import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// Actions
import { setMovies, setUser } from '../../actions/actions';

//Import different views of app.

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { UpdateProfile } from '../updateprofile-view/updateprofile-view';
import { NavbarView } from '../navbar-view/navbar-view';
import   MoviesList  from '../movieslist-view/movieslist-view'

//Import from react-bootstrap.

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";


//Export component.

class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
          userEmail: null,
          userBirthday: null,
          favoriteMovies: null
        };
      }

      componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
          this.setState({
            user: localStorage.getItem('user'),
            userEmail: localStorage.getItem('userEmail'),
            userBirthday: localStorage.getItem('userBirthday'),
            favoriteMovies: localStorage.getItem('favoriteMovies')
          });
          this.getMovies(accessToken);
        }
      }

      onLoggedIn(authData) {
        console.log(authData);
        this.setState({
          user: this.props.setUser(authData.user),
          userEmail: authData.user.Email,
          userBirthday: authData.user.Birthday,
          favoriteMovies: authData.user.FavoriteMovies
        });

        this.props.setUser(authData.user); 
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Name);
        localStorage.setItem('userEmail', authData.user.Email);
        localStorage.setItem('userBirthday', authData.user.Birthday);
        localStorage.setItem('favoriteMovies', authData.user.FavoriteMovies);
        this.getMovies(authData.token);
      }

      onRegister(register) {
        this.setState({
          register
        });
      }
      


      getMovies(token) {
        axios.get('https://gamingmovies.herokuapp.com/movies', {
          headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
          this.props.setMovies(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      }

      render() {
        const { userEmail, userBirthday, user} = this.state;
        const { movies } = this.props;
    
        return (
          <Router>
          <Row className="main-view justify-content-md-center">

                <Route exact path="/" render={() => {
                if (!user) return <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
                if (movies.length === 0) return <div className="main-view"></div>;
                return  (
                  <Container fluid>
                    <Row>
                        <Col className="main-view justify-content-md-center">
                      <NavbarView />
                      <div className="d-flex flex-wrap justify-content-md-center">
                    <MoviesList movies={movies} />
                       </div>
                      </Col>
                    </Row>
                  </Container>
                
                );
              }} />

              <Route path="/register" render={() => {
                if (user) return <Redirect to="/" />
                return <Col>
                  <RegistrationView />
                </Col>
              }} />

              <Route path="/movies/:movieId" render={({ match, history }) => {
                   if (!user) return 
                   <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                   </Col>
                   if (movies.length === 0) return <div className="main-view" />;
                return <Col>
                  <NavbarView />
                  <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()}/>
                </Col>
              }} />

              
              <Route path="/directors/:name" render={({ match, history }) => {
                  if (!user) return <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                  if (movies.length === 0) return <div className="main-view" />;
                return <Col>
                  <NavbarView />
                  <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                </Col>
              }
              } />

              <Route path="/genres/:name" render={({ match, history }) => {
                if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
                return <Col>
                <NavbarView />
                  <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                </Col>
              }
              } />

              <Route path="/users/:name" render={({ history }) => {
                if (!user) return <Col>
                                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>
                return <Col>
                  <NavbarView />
                  <ProfileView movies={movies} userData={user} userEmail={userEmail} userBirthday={userBirthday} onBackClick={() => history.goBack()} />
                </Col>
              }
              } />

              <Route path="/update/:name" render={({ history }) => {
                if (!user) return <Col>
                                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>
                return <Col md={8}>
                  <UpdateProfile userData={user} onBackClick={() => history.goBack()} />
                </Col>
              }
              } />
              </Row>
              </Router>
        );
      }
};

let mapStateToProps = state => {
  return { movies: state.movies,
           user: state.user }
}

export default connect(mapStateToProps, { setMovies, setUser } )(MainView);