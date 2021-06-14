import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import './updateprofile-view.scss'


export function UpdateProfile(props) {
    const [ name, setName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');

    const [nameError, setNameError] = useState({});
    const [passwordError, setPasswordError] = useState({});
    const [emailError, setEmailError] = useState({});

    const onBackClick = props.onBackClick;
    const userCurrent = localStorage.getItem("user");
    const emailCurrent = localStorage.getItem("userEmail");

    const handleUpdate = (e) => {
        e.preventDefault();
    
        const isValid = formValidation();
    
        const url =
          "https://gamingmovies.herokuapp.com/users/" +
          localStorage.getItem("user");
    
        if (isValid) {
          axios.put(
              url,
              {
                Name: name,
                Password: password,
                Email: email,
                Birthday: birthday,
              },
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            )
            .then((response) => {
              const data = response.data;
              localStorage.setItem("user", data.Name);
              localStorage.setItem('userEmail', data.Email);
              localStorage.setItem('userBirthday', data.Birthday);
              alert("Profile updated successfully");
              window.open("/", "_self");
            })
            .catch((e) => {
              console.log(e);
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
        <div className="profileupdate-view">
          <Form className="registration-form" style={{fontSize: '28px', maxWidth: '500px', textAlign: 'center', margin: '0 auto'}}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                style={{ textAlign: 'center', fontSize: '20px'}}
                type="text"
                value={name}
                placeholder={userCurrent}
                required
                onChange={(e) => setName(e.target.value)}
              />
              {Object.keys(nameError).map((key) => {
                return (
                  <div key={key} style={{ fontSize: '16px'}}>
                    {nameError[key]}
                  </div>
                );
              })}
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                style={{ textAlign: 'center', fontSize: '20px'}}
                type="password"
                value={password}
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              {Object.keys(passwordError).map((key) => {
                return (
                  <div key={key} style={{ fontSize: '16px'}}>
                    {passwordError[key]}
                  </div>
                );
              })}
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                style={{ textAlign: 'center', fontSize: '20px'}}
                type="email"
                value={email}
                placeholder={emailCurrent}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              {Object.keys(emailError).map((key) => {
                return (
                  <div key={key} style={{ fontSize: '16px'}}>
                    {emailError[key]}
                  </div>
                );
              })}
            </Form.Group>
            <Form.Group>
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                style={{ textAlign: 'center', fontSize: '20px'}}
                type="text"
                value={birthday}
                placeholder="yyyy-mm-dd"
                required
                onChange={(e) => setBirthday(e.target.value)}
              />
            </Form.Group>
            <Button style={{ width: '100px' ,fontSize: '24px' ,backgroundColor: 'black', border: 'none', textDecoration: 'none', color: 'white' }} onClick={onBackClick}>Back</Button>
            <Link to={`/users`}>
              <Button
                style={{ width: '100px' ,fontSize: '24px' ,backgroundColor: 'white', border: 'none', textDecoration: 'none', color: 'black' }}
                type="submit"
                onClick={handleUpdate}
              >
                Save
              </Button>
            </Link>
          </Form>
        </div>
      );
}