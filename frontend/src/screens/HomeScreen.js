import React, { useState, useEffect, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import { Card } from 'react-bootstrap';
import styles from './HomeScreen.module.css';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import userApi from '../api/UserApi';

function HomeScreen({ dbUser, setDbUser }) {
  const [idea, setIdea] = useState(null);
  const [cardKey, setCardKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const isSwiping = useRef(false);
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();


  useEffect(() => {
    if (!isAuthenticated || dbUser) {
      return;
    }

    const getUser = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await userApi.getUserByID(user.sub, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status !== 200) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        setDbUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
    fetchIdea();
  }, [isAuthenticated, getAccessTokenSilently, user, dbUser]);

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
      alert(error.message)
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

  // ... Other imports and code

const handleClaim = async (ideaId) => {
  if (!dbUser) {
    console.log('dbUser is undefined');
    return;
  }

  console.log('inside handleclaim');
  console.log('ideaId:', ideaId);
  console.log('dbUser:', dbUser);

  try {
    const token = await getAccessTokenSilently();
    await userApi.reduceCredits(dbUser._id, token);
    const response = await userApi.claimIdea(dbUser._id, ideaId, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setDbUser(response.data);
  } catch (error) {
    console.log('Error claiming idea:', error);
  }
};




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
      <button onClick={() => {handleClaim(idea.id, dbUser, setDbUser)}}>Claim</button>
    </main>
  </div>

    
  )
}
export default HomeScreen;