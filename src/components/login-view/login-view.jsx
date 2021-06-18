import React, { useState } from 'react';
import PropTypes from 'prop-types'
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import '../login-view/login-view.scss'
import { Link } from "react-router-dom";

export function LoginView(props) {
    const [ name, setName ] = useState('');
    const [ password, setPassword ] = useState('');

    const [nameError, setNameError] = useState({});
    const [passwordError, setPasswordError] = useState({});
  
    const handleLogin = (e) => {
      e.preventDefault();
      /* Send a request to the server for authentication */
      const isValid = formValidation();
      if (isValid) {
      axios.post('https://gamingmovies.herokuapp.com/login', {
        Name: name,
        Password: password
      })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
      });
     }
    };

    const formValidation = () => {
      const nameError = {};
      const passwordError = {};
      let isValid = true;
  
      if (name.trim().length < 1) {
        nameError.nameShort = "Username is required";
        isValid = false;
      }
  
      if (password.trim().length < 1) {
        passwordError.passwordMissing = "Password is required";
        isValid = false;
      }
  
      setNameError(nameError);
      setPasswordError(passwordError);
      return isValid;
    };
  
    return (
      <div>
        <Row>
        <Nav as="ul" className="nav_login">
              <Container>
                <Link to="/"><Navbar.Brand className="nav_login_logo" >GAMING MOVIES</Navbar.Brand></Link>
                </Container>
        </Nav>
        <Container className="container_login">
        <Form className="form_login">
          <Form.Group controlId="formUsername" className="formUsername" md={12}>
            <Form.Label className="form_label_login">Username:</Form.Label>
            <Form.Control className="form_input_login" type="text" onChange={e => setName(e.target.value)} />
          </Form.Group> 
          {Object.keys(nameError).map((key) => {
              return (
                <div key={key} className="errormessage_login">
                  {nameError[key]}
                </div>
              );
            })}
    
          <Form.Group controlId="formPassword" className="formPassword">
            <Form.Label className="form_label_login">Password:</Form.Label>
            <Form.Control className="form_input_login" type="password" onChange={e => setPassword(e.target.value)} />
          </Form.Group>

          {Object.keys(passwordError).map((key) => {
          return (
            <div key={key} className="errormessage_login">
              {passwordError[key]}
            </div>
          );
        })}

          <Link to={`/register`}>
          <Button className="btn_register"  variant="link">
            Register
          </Button>
          </Link>
          <Link to={`/`}>
          <Button className="btn_login" variant="link" type="submit" onClick={handleLogin}>
            Login
          </Button>
          </Link>
        </Form>
        </Container>
        </Row>
        </div>
      );
  }

LoginView.propTypes = {
    user: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
    }),
    onLoggedIn: PropTypes.func
};