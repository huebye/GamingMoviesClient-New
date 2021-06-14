import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';

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
    const { user } = this.props
    return(<Container>
        <Row className="main-view justify-content-md-center">
            <Nav as="ul" style={{ maxHeight: '60px', fontSize: '25px', justifyContent: 'flex-end', backgroundColor: 'rgba(194, 163, 255, 0.8)', minWidth: '100vW'}}>
              <Container>
                <Link to="/"><Navbar.Brand style={{ position: 'absolute', left: '10px' , fontSize: '38px', color: 'white', fontWeight: '800'}}>GAMING MOVIES</Navbar.Brand></Link>
                </Container>
                <Nav.Item >
                    <Nav.Link href="https://elated-boyd-1f0080.netlify.app/users/${user}" style={{ color: 'black', backgroundColor:'white', width: 'auto', textAlign: 'center' }} >Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item >
                    <Nav.Link style={{ color: 'white', backgroundColor:'black', width: 'auto', textAlign: 'center' }} onClick={() => { this.onLoggedOut() }}>Log Out</Nav.Link>
                </Nav.Item>
           </Nav>
        </Row>
  </Container>

    )}}
export default NavbarView;