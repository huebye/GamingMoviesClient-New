import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
      <Container style={{display: 'flex'}}>
        <Form style={{fontSize: '28px', maxWidth: '500px', textAlign: 'center', margin: '0 auto', marginTop: '170px', background: 'rgba(255, 255, 255, 0.26)', padding: '30px', borderRadius: '4px'}}>
        <Form.Group controlId="formName">
          <Form.Label style={{ fontSize: '22px', float: 'left', width: '100px'}}>Username:</Form.Label>
          <Form.Control style={{ textAlign: 'center', width: '250px', margin: '0 auto', fontSize: '20px'}} type="text" onChange={e => setName(e.target.value)} />
        </Form.Group>

        {Object.keys(nameError).map((key) => {
                return (
                  <div key={key} style={{ fontSize: '16px', textAlign: 'right'}}>
                    {nameError[key]}
                  </div>
                );
              })}
  
        <Form.Group controlId="formPassword">
          <Form.Label style={{ fontSize: '22px', float: 'left', width: '100px'}}>Password:</Form.Label>
          <Form.Control style={{ textAlign: 'center', fontSize: '20px', width: '250px', margin: '0 auto'}}  type="password" onChange={e => setPassword(e.target.value)} />
        </Form.Group>

        {Object.keys(passwordError).map((key) => {
                return (
                  <div key={key} style={{ fontSize: '16px', textAlign: 'right'}}>
                    {passwordError[key]}
                  </div>
                );
              })}

        <Form.Group controlId="formEmail">
          <Form.Label style={{ fontSize: '22px', float: 'left', width: '100px'}}>Email:</Form.Label>
          <Form.Control style={{ textAlign: 'center', fontSize: '20px', width: '250px', margin: '0 auto'}} type="email" onChange={e => setEmail(e.target.value)} />
        </Form.Group>

        {Object.keys(emailError).map((key) => {
                return (
                  <div key={key} style={{ fontSize: '16px', textAlign: 'right'}}>
                    {emailError[key]}
                  </div>
                );
              })}

        <Form.Group controlId="formBirthday">
          <Form.Label style={{ fontSize: '22px', float: 'left', width: '100px'}}>Birthday:</Form.Label>
          <Form.Control style={{ textAlign: 'center', fontSize: '20px', width: '250px', margin: '0 auto'}} placeholder="yyyy-mm-dd" type="birthday" onChange={e => setBirthday(e.target.value)} />
        </Form.Group>
        <Link to={`/`}>
        <Button style={{ width: '100px' ,fontSize: '24px' ,backgroundColor: 'black', border: 'none', color: 'white',textDecoration: 'none' }} variant="link">
          Back
        </Button>
        </Link>
        <Button style={{ width: '100px' ,fontSize: '24px' ,backgroundColor: '#C2A3FF', border: 'none', margin: '10px' }} variant="primary" type="submit" onClick={handleSubmit}>
          Register
        </Button>
      </Form>
      </Container>
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