import React, { useState, useEffect } from 'react'
import { Row, Card } from 'react-bootstrap'
import axios from 'axios'

const MostLiked = () => {
  const [ideas, setIdeas] = useState([])

  useEffect(() => {
    const fetchIdeas = async () => {
      const response = await axios.get('/api/ideas')
      const data = response.data

      setIdeas(data)
    }

    fetchIdeas()
  }, [])

  return (
    <>
      <h1>Most Liked Ideas</h1>
      {ideas
        .sort((a, b) => b.likes - a.likes)
        .map((idea) => (
          <Row key={idea._id}>
            <Card>
              <h4>{idea.text}</h4>
              <p>likes: {idea.likes}</p>
            </Card>
          </Row>
        ))}
    </>
  )
}

export default MostLiked
