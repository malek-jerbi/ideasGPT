import React, { useState, useEffect } from 'react'
import { Row, Card } from 'react-bootstrap'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'

const MostLiked = () => {
  const [ideas, setIdeas] = useState([])
  const { getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    const fetchIdeas = async () => {
      const token = await getAccessTokenSilently()
      const response = await axios.get('/ideas', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
