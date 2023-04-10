import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';
import { useAuthContext } from './AuthContext';


const Header = () => {
  const { isAuthenticated } = useAuth0();
  const { dbUser } = useAuthContext();

  return (
    <header>
      <Navbar expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>IdeasGPT</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto nav">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/mostliked">
                <Nav.Link>Most Liked</Nav.Link>
              </LinkContainer>
              {isAuthenticated && (
                <LinkContainer to="/userProfile">
                  <Nav.Link>
                    My Profile (Credits: {dbUser?.credits})
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
            <LoginButton />
            <LogoutButton />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
