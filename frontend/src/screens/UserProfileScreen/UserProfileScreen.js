import { React, useEffect, useContext } from 'react'
import { Box } from '@mui/material'
import AuthContext from '../../components/AuthContext.js'
import { styled } from '@mui/system'
import UsersIdeaTable from '../../components/UsersIdeaTable/UsersIdeaTable.js'
import ClaimedIdeasTable from '../../components/ClaimedIdeasTable/ClaimedIdeasTable.js'
import { useAuth0 } from '@auth0/auth0-react'
import userApi from '../../api/UserApi.js'

const StyledBox = styled(Box)({
  color: '#6B068',
  backgroundColor: '#F5F5F5',
  boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
  margin: 'auto',
  marginTop: 25,
  borderRadius: 25,
  minHeight: '90vh',
  maxWidth: 1000,
  padding: 50,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: 25,
})

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

  return (
    <>
      <StyledBox id='userProfile'>
        {dbUser && <UsersIdeaTable likedIdeas={dbUser.likedIdeas} />}
        {dbUser && <ClaimedIdeasTable ClaimedIdeas={dbUser.claimedIdeas} />}
      </StyledBox>
    </>
  )
}

export default UserProfileScreen
