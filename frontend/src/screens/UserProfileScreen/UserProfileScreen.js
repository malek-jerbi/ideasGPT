import { React, useEffect, useContext } from 'react'
import { Box } from '@mui/material'
import AuthContext from '../../components/AuthContext.js'
import { styled } from '@mui/system'
import UsersIdeaTable from '../../components/UsersIdeaTable/UsersIdeaTable.js'
import ClaimedIdeasTable from '../../components/ClaimedIdeasTable/ClaimedIdeasTable.js'
import { useAuth0 } from '@auth0/auth0-react'
import userApi from '../../api/UserApi.js'

const UserProfileScreen = () => {
  const { dbUser, setdbUser } = useContext(AuthContext)
  const { getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    getUserInfo()
  }, [])

  const getUserInfo = async () => {
    try {
      const access_token = await getAccessTokenSilently()
      console.log(dbUser)

      const apiCall = await userApi.getUserByID(dbUser._id, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      setdbUser(apiCall.data.data)
    } catch (error) {}
  }
  const rightSwipedIdeas = dbUser.swipedIdeas.filter(idea => idea.action === 'right');
  return (
    <>
        {dbUser && <UsersIdeaTable swipedIdeas={rightSwipedIdeas} />}
        {dbUser && <ClaimedIdeasTable ClaimedIdeas={dbUser.claimedIdeas} />}
    </>
  )
}

export default UserProfileScreen

// where in the code is favicon.ico mentioned?
// Path: frontend\src\index.js