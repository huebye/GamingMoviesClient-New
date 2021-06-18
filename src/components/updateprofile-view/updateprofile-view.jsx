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
    const birthdayCurrent = localStorage.getItem("userBirthday");

    const handleUpdate = (e) => {
        e.preventDefault();
    
        const isValid = formValidation();
        let user = localStorage.getItem("user")
        const url =
          `https://gamingmovies.herokuapp.com/users/${user}`
    
        if (isValid) {
          axios.put(
              url,
              {
                Name: name !== '' ? name : userCurrent,
                Password: password,
                Email: email !== '' ? email : emailCurrent,
                Birthday: birthday !== '' ? birthday : birthdayCurrent,
              },
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            )
            .then((response) => {
              const data = response.data;
              console.log(data.Name);
              console.log(data.Email);
              console.log(data.Birthday);
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
        


        if (name !== '' && name.trim().length < 5) {
          nameError.nameShort = "Minimum 5 characters";
          isValid = false;
        }

        if (password.trim().length < 1) {
          passwordError.passwordMissing = "Password is required";
          isValid = false;
        }

    
        if (email !== '' && !email.includes(".") && !email.includes("@")) {
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
          <Form className="registration-form">
            <Form.Group controlId="formBasicName">
              <Form.Label>Username</Form.Label>
              <Form.Control
                className="inputfield"
                type="text"
                autoComplete="name"
                defaultValue={userCurrent}
                required
                onChange={(e) => setName(e.target.value)}
              />
              {Object.keys(nameError).map((key) => {
                return (
                  <div className="error-message" key={key}>
                    {nameError[key]}
                  </div>
                );
              })}
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className="inputfield"
                type="password"
                value={password}
                placeholder="Password"
                autoComplete="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              {Object.keys(passwordError).map((key) => {
                return (
                  <div key={key} className="error-message">
                    {passwordError[key]}
                  </div>
                );
              })}
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                className="inputfield"
                type="email"
                defaultValue={emailCurrent}
                placeholder="example@gmx.de"
                autoComplete="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              {Object.keys(emailError).map((key) => {
                return (
                  <div key={key} className="error-message">
                    {emailError[key]}
                  </div>
                );
              })}
            </Form.Group>
            <Form.Group controlId="formBasicBirthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                className="inputfield"
                type="text"
                defaultValue={birthdayCurrent.substr(0, 10)}
                placeholder="yyyy-mm-dd"
                required
                onChange={(e) => setBirthday(e.target.value)}
              />
            </Form.Group>
            <Button className="btn_back" onClick={onBackClick}>Back</Button>
            <Link to={`/users`}>
              <Button
                className="btn_save"
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