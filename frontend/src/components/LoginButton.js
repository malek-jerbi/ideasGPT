import { useAuth0 } from '@auth0/auth0-react'
import { React, useEffect, useContext } from 'react'
import userApi from '../api/UserApi'
import AuthContext from './AuthContext'

function LoginButton() {
  const { loginWithPopup, isAuthenticated, user, getAccessTokenSilently } =
    useAuth0()
  const { dbUser, setdbUser } = useContext(AuthContext)

  useEffect(() => {
    createUsers()
  })

  const createUsers = async () => {
    if (isAuthenticated && dbUser == null) {
      const payload = { email: user.email, name: user.name }
      try {
        const access_token = await getAccessTokenSilently()
        console.log('Access token:', access_token)
        if (access_token) {
          const apiCall = await userApi.createUser(payload, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          })

          setdbUser(apiCall.data.data)
        }
      } catch (error) {}
    }
  }

  return (
    !isAuthenticated && (
      <button
        onClick={() => {
          loginWithPopup()
        }}
      >
        Sign In
      </button>
    )
  )
}

export default LoginButton
