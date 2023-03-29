import React, { useState, useEffect, useRef } from 'react'
import TinderCard from 'react-tinder-card'
import { Card } from 'react-bootstrap'
import styles from './HomeScreen.module.css'

export default function HomeScreen() {
  const [idea, setIdea] = useState(null)
  const [cardKey, setCardKey] = useState(0)
  const [loading, setLoading] = useState(false)
  const isSwiping = useRef(false)

  useEffect(() => {
    fetchIdea()
  }, [])

  async function fetchIdea() {
    if (loading) {
      return
    }
    setLoading(true)
    try {
      const response = await fetch('/api/ideas/random', {
        method: 'GET',
      })

      const data = await response.json()

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
      alert(error.message)
    }
  }

  const onSwipe = (direction) => {
    if (isSwiping.current) {
      return
    }
    isSwiping.current = true
    console.log('You swiped: ' + direction)
    fetchIdea()
    setCardKey((prevKey) => prevKey + 1)
  }

  const onCardLeftScreen = () => {
    console.log('You swiped the card off the screen.')
    isSwiping.current = false
  }

  return (
    <div>
      <main>
        {!loading && idea && (
          <div className={styles.cardWrapper}>
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
          </div>
        )}
      </main>
    </div>
  )
}
