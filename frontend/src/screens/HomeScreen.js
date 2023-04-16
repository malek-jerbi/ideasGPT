import React, { useState, useEffect, useRef } from 'react'
import TinderCard from 'react-tinder-card'
import { Card } from 'react-bootstrap'
import styles from './HomeScreen.module.css'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import ClaimButton from '../components/ClaimButton'

export default function HomeScreen() {
  const [idea, setIdea] = useState(null)
  const [cardKey, setCardKey] = useState(0)
  const [loading, setLoading] = useState(false)
  const isSwiping = useRef(false)
  const { getAccessTokenSilently } = useAuth0()
  const [openAIError, setOpenAIError] = useState(false)
  const errorCardRef = useRef()

  useEffect(() => {
    fetchIdea()
  }, [])

  async function fetchIdea() {
    if (loading) {
      return
    }
    setLoading(true)
    try {
      const token = await getAccessTokenSilently()
      const response = await axios.get('/ideas/random', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.data
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        )
      }

      setIdea(data)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
      if (
        (error.response &&
          error.response.data.message.includes('OpenAI API')) ||
        error.response.data.message.includes('Error fetching idea')
      ) {
        setOpenAIError(true)
      } else {
        alert(error.message)
      }
    }
  }

  const onSwipe = async (direction) => {
    if (isSwiping.current) {
      return
    }
    isSwiping.current = true
    console.log('You swiped: ' + direction)

    try {
      // Get the access token
      const token = await getAccessTokenSilently()

      // Send a POST request to the backend with the idea ID and the action (like/dislike)
      const response = await axios.post(
        '/users/swipe',
        {
          ideaId: idea.id,
          action: direction,
          ideaText: idea.text,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      // Check the response status
      if (response.status !== 200) {
        throw new Error(`Request failed with status ${response.status}`)
      }

      // Fetch a new idea
      fetchIdea()
      setCardKey((prevKey) => prevKey + 1)
    } catch (error) {
      console.error(error)
      alert(error.message)
    }
  }

  const onCardLeftScreen = () => {
    console.log('You swiped the card off the screen.')
    isSwiping.current = false
  }

  const onSwipeErrorCard = () => {
    if (errorCardRef.current) {
      errorCardRef.current.reset()
    }
  }

  return (
    <div>
      <main>
        {!loading && (
          <div className={styles.cardWrapper}>
            {openAIError ? (
              // Error card
              <TinderCard
                key='error'
                ref={errorCardRef}
                onSwipe={onSwipeErrorCard}
                onCardLeftScreen={() => {}}
                preventSwipe={[]}
              >
                <Card className={`text-center ${styles.errorCardStyle}`}>
                  <Card.Body>
                    <Card.Title className={styles.unselectable}>
                      Service is currently down
                    </Card.Title>
                    <Card.Text className={styles.unselectable}>
                      Please try again later.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </TinderCard>
            ) : (
              idea && (
                // Idea card
                <TinderCard
                  key={cardKey}
                  onSwipe={onSwipe}
                  onCardLeftScreen={onCardLeftScreen}
                  preventSwipe={['up', 'down']}
                >
                  <Card className={`text-center ${styles.cardStyle}`}>
                    <Card.Body>
                      <Card.Text className={styles.unselectable}>
                        {idea.text}
                      </Card.Text>
                      <Card.Text className={styles.likes}>
                        Likes: {idea.likes}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </TinderCard>
              )
            )}
          </div>
        )}
        {idea && <ClaimButton ideaId={idea.id} fetchIdea={fetchIdea} style={{ color: "white", fontFamily: 'Verdana, sans-serif' }} />}
      </main>
    </div>
  )
}
