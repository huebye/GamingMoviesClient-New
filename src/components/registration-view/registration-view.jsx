import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import '../registration-view/registration-view.scss'

import { Link } from "react-router-dom";
import Container from 'react-bootstrap/esm/Container';

export function RegistrationView() {
    const [ name, setName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');

    const [nameError, setNameError] = useState({});
    const [passwordError, setPasswordError] = useState({});
    const [emailError, setEmailError] = useState({});

    const handleSubmit = (e) => {
      e.preventDefault();
      const isValid = formValidation();
      if (isValid) {
      axios.post('https://gamingmovies.herokuapp.com/users', {
        Name: name,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch(e => {
        console.log('error registering the user')
      });
     }
    };

      const formValidation = () => {
        const nameError = {};
        const passwordError = {};
        const emailError = {};
        let isValid = true;
    
        if (name.trim().length < 5) {
          nameError.nameShort = "Minimum 5 characters";
          isValid = false;
        }

        if (password.trim().length < 1) {
          passwordError.passwordMissing = "Password is required";
          isValid = false;
        }

    
        if (!email.includes(".") && !email.includes("@")) {
          emailError.emailNotEmail = "Email doesn't seem valid";
          isValid = false;
        }
    
        setNameError(nameError);
        setPasswordError(passwordError);
        setEmailError(emailError);
        return isValid;
      };

  
    return (
      <div>
      <Nav as="ul" className="nav_register">
              <Container>
                <Link to="/"><Navbar.Brand className="nav_register_logo">GAMING MOVIES</Navbar.Brand></Link>
                </Container>
        </Nav>
      <Container className="container_register">
        <Form className="form_register">
        <Form.Group controlId="formName">
          <Form.Label className="form_label_register">Username:</Form.Label>
          <Form.Control className="form_input_register" type="text" onChange={e => setName(e.target.value)} />
        </Form.Group>

        {Object.keys(nameError).map((key) => {
                return (
                  <div key={key} style={{ fontSize: '16px', textAlign: 'right'}}>
                    {nameError[key]}
                  </div>
                );
              })}
  
        <Form.Group controlId="formPassword">
          <Form.Label className="form_label_register">Password:</Form.Label>
          <Form.Control className="form_input_register"  type="password" onChange={e => setPassword(e.target.value)} />
        </Form.Group>

        {Object.keys(passwordError).map((key) => {
                return (
                  <div key={key} style={{ fontSize: '16px', textAlign: 'right'}}>
                    {passwordError[key]}
                  </div>
                );
              })}

        <Form.Group controlId="formEmail">
          <Form.Label className="form_label_register">Email:</Form.Label>
          <Form.Control className="form_input_register"type="email" onChange={e => setEmail(e.target.value)} />
        </Form.Group>

        {Object.keys(emailError).map((key) => {
                return (
                  <div key={key} style={{ fontSize: '16px', textAlign: 'right'}}>
                    {emailError[key]}
                  </div>
                );
              })}

        <Form.Group controlId="formBirthday">
          <Form.Label className="form_label_register">Birthday:</Form.Label>
          <Form.Control className="form_input_register" placeholder="yyyy-mm-dd" type="birthday" onChange={e => setBirthday(e.target.value)} />
        </Form.Group>
        <Link to={`/`}>
        <Button className="btn_back_register" variant="link">
          Back
        </Button>
        </Link>
        <Button className="btn_register_submit" variant="primary" type="submit" onClick={handleSubmit}>
          Register
        </Button>
      </Form>
      </Container>
      </div>
    );
    
  }

RegistrationView.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        birthday: PropTypes.string.isRequired
    }),

};