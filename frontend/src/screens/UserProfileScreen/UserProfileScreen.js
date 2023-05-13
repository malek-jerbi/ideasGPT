import { React, useEffect, useContext } from 'react'
import AuthContext from '../../components/AuthContext.js'
import UsersIdeaTable from '../../components/UsersIdeaTable/UsersIdeaTable.js'
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

      const apiCall = await userApi.getUserByID(dbUser._id, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      setdbUser(apiCall.data.data)
    } catch (error) {}
  }

  const rightSwipedIdeas = dbUser.swipedIdeas.filter(
    (idea) => idea.idea && idea.action === 'right'
  )
  return <>{dbUser && <UsersIdeaTable swipedIdeas={rightSwipedIdeas} />}</>
}

export default UserProfileScreen
