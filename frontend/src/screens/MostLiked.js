import React, { useState, useEffect } from 'react';
import { Row, Card } from 'react-bootstrap';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { styled } from '@mui/system'
import { Box } from '@mui/material'

const MostLiked = () => {
  const [ideas, setIdeas] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchIdeas = async () => {
      const token = await getAccessTokenSilently();
      const response = await axios.get('/ideas', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;

      setIdeas(data);
    };

    fetchIdeas();
  }, []);

  const StyledBox = styled(
    Box,
    {}
  )({
    color: '6B068',
    backgroundColor: '#F5F5F5',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
    margin: 'auto',
    marginTop: 25,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    padding: 50,
  })

  const containerStyle = {
    padding: '2rem',
  };

  const titleStyle = {
    fontSize: '2rem',
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#2c3e50',
  };

  const cardStyle = {
    marginBottom: '2rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: '0.3s',
  };

  const cardHoverStyle = {
    transform: 'translateY(-5px)',
    boxShadow: '0 6px 10px rgba(0, 0, 0, 0.2)',
  };

  const textStyle = {
    fontSize: '1rem', // Reduced font size
    fontWeight: 'bold',
    margin: '0.5rem', // Reduced margin
    width: '600px'
  };
  

  const likesStyle = {
    fontSize: '1.2rem', // Increased font size
  color: '#4d7358',
  margin: '1rem', // Increased margin
    fontWeight: 'bold',
  };

  const rowStyle = {
    display: 'flex',
    justifyContent: 'center',
  };

  return (
    <StyledBox>
    <div style={containerStyle}>
      <h1 style={titleStyle}>Most Liked Ideas</h1>
      {ideas
        .sort((a, b) => b.likes - a.likes)
        .map((idea) => (
          <Row key={idea._id} style={{ marginBottom: '1rem' }}>
            <Card
              style={cardStyle}
            >
              <div style={rowStyle}>
              <Box><h4 style={textStyle}>{idea.text}</h4></Box>
              <Box><p style={likesStyle}>likes: {idea.likes}</p></Box>
              </div>
            </Card>
          </Row>
        ))}
    </div>
    </StyledBox>
  );
};

export default MostLiked;
