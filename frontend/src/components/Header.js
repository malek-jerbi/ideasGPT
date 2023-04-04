import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Container } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'

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
            <Nav className='mr-auto'>
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
