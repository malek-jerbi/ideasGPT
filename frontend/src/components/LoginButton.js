import { useAuth0 } from "@auth0/auth0-react";
import { React, useEffect } from 'react';
import userApi from "../api/UserApi";






function LoginButton() {

  const {loginWithPopup, isAuthenticated, user, getAccessTokenSilently} = useAuth0();

  useEffect(() => {
    createUsers();

  })

  const createUsers = async () => {

        if (isAuthenticated){
          const payload = { email: user.email, name: user.name };
          try {


            const access_token = await getAccessTokenSilently();
    
            
            if (access_token){
            const apiCall =  await userApi.createUser(payload, {
              headers: {
                Authorization: `Bearer ${access_token}`,
              }
            });
            console.log (apiCall.request)
            console.log(apiCall);
            }
            
        } catch (error) {
          
        }
      }

  }


  return (

    !isAuthenticated && (
        <button onClick={() =>{ loginWithPopup()}}>
            Sign In
        </button>
    )

  )
}

export default LoginButton