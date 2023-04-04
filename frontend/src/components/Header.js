import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Container } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'

// q: Where can I find the CSS for the Navbar component?
// a: The CSS for the Navbar component is in the following file:
// C:\Users\james\Documents\GitHub\IdeasGPT\frontend\node_modules\react-bootstrap\src\Navbar.js

// q: Where can I do custom CSS on the Navbar component?
// a: I can do custom CSS on the Navbar component by adding a className prop to the Navbar component

// q: I want to move the

const Header = () => {
  return (
    <header>
      <Navbar bg='light' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>IdeasGPT</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto nav'>
              <LinkContainer to='/'>
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/mostliked'>
                <Nav.Link>Most Liked</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/userProfile'>
                <Nav.Link>My Profile</Nav.Link>
              </LinkContainer>
            </Nav>
            <LoginButton></LoginButton>
            <LogoutButton></LogoutButton>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
