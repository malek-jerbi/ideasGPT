import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './Footer.module.css'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>SOEN 487</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
