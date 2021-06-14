import React, { useState } from 'react';
import PropTypes from 'prop-types'
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

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
        <Nav as="ul" style={{ maxHeight: '60px', fontSize: '25px', justifyContent: 'flex-end', backgroundColor: 'rgba(194, 163, 255, 0.8)', minWidth: '100%'}}>
              <Container>
                <Link to="/"><Navbar.Brand style={{ position: 'absolute', left: '10px' , fontSize: '44px', color: 'white', fontWeight: '800'}}>GAMING MOVIES</Navbar.Brand></Link>
                </Container>
        </Nav>
        <Container style={{ display: 'flex'}}>
        <Form style={{borderRadius: '4px' ,padding: '30px' ,fontSize: '28px', maxWidth: '600px', textAlign: 'center', margin: '0 auto', marginTop: '200px', background: 'rgba(255, 255, 255, 0.26)', height: 'auto', width: 'auto'}}>
          <Form.Group controlId="formUsername" md={12} style={{padding: '10px', marginTop: '20px'}}>
            <Form.Label style={{ fontSize: '22px', float: 'left', width: '100px'}}>Username:</Form.Label>
            <Form.Control style={{ margin: '0 auto' ,textAlign: 'center', fontSize: '20px', width: '200px'}} type="text" onChange={e => setName(e.target.value)} />
          </Form.Group>
          {Object.keys(nameError).map((key) => {
              return (
                <div key={key} style={{ fontSize: '16px'}}>
                  {nameError[key]}
                </div>
              );
            })}
    
          <Form.Group controlId="formPassword" style={{padding: '10px'}}>
            <Form.Label style={{ fontSize: '22px', float: 'left', width: '100px'}}>Password:</Form.Label>
            <Form.Control style={{margin: '0 auto' ,textAlign: 'center', fontSize: '20px', width: '200px'}} type="password" onChange={e => setPassword(e.target.value)} />
          </Form.Group>

          {Object.keys(passwordError).map((key) => {
          return (
            <div key={key} style={{ fontSize: '16px'}}>
              {passwordError[key]}
            </div>
          );
        })}

          <Link to={`/register`}>
          <Button style={{ width: '100px' ,fontSize: '24px' ,backgroundColor: 'black', border: 'none', color: 'white',textDecoration: 'none' }} variant="link">
            Register
          </Button>
          </Link>
          <Link to={`/`}>
          <Button style={{ width: '100px' ,fontSize: '24px' ,backgroundColor: '#C2A3FF', border: 'none', margin: '24px', color: 'white',textDecoration: 'none' }} variant="link" type="submit" onClick={handleLogin}>
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