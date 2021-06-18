import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'
import '../navbar-view/navbar-view.scss'
import { Link } from "react-router-dom";




export class NavbarView extends React.Component{

  
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userBirthday');
    localStorage.removeItem('favoriteMovies');
    this.setState({
      user: null,
    });
    window.open("/", "_self");
  }

  render(){
    let user = localStorage.getItem('user');
    return(<Container fluid>
        <Row className="main-view justify-content-md-center" xs={12}>
            <Nav as="ul" className="navbar1234">
              <Container>
                <Link to="/"><Navbar.Brand className="logo_style">GAMING MOVIES</Navbar.Brand></Link>
                </Container>
                <Nav.Item >
                  <Link to={`/users/${user}`}><Button  className="btn_profile">Profile</Button></Link>
                </Nav.Item>
                <Nav.Item >
                    <Nav.Link className="btn_logout"  onClick={() => { this.onLoggedOut() }}>Log Out</Nav.Link>
                </Nav.Item>
           </Nav>
        </Row>
  </Container>

    )}}