import { useAuth0 } from "@auth0/auth0-react";
import { React, useEffect, useContext } from 'react';
import userApi from "../api/UserApi";
import AuthContext from "./AuthContext";







function LoginButton() {

  const {loginWithPopup, isAuthenticated, user, getAccessTokenSilently} = useAuth0();
  const { userID, setUserID } = useContext(AuthContext);


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

            
            setUserID(apiCall.data.data._id);
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