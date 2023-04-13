import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { React, useEffect, useContext, useState } from 'react';
import userApi from '../api/UserApi.js';
import AuthContext from "./AuthContext.js";


function ClaimButton({ ideaId, fetchIdea }) {
    const [userCredit, setUserCredit] = useState(0);
    const { isAuthenticated } = useAuth0();
    const { getAccessTokenSilently } = useAuth0();
    const { dbUser } = useContext(AuthContext);
  
    useEffect(() => {
      async function getUserCredit() {
        try {
          const token = await getAccessTokenSilently();
          //console.log('token', token);
          console.log('dbUser', dbUser);
          console.log('get user credit for user with id:', dbUser._id);
  
          const apiCall = await userApi.getUserByID(dbUser._id, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log('API call response:', apiCall);

          const userCreditFromApi = apiCall.data.data.credits;

          if (userCreditFromApi) {
            setUserCredit(userCreditFromApi);
            console.log('User credit:', userCredit);
          }
          else {console.log('cannot get credit')}

        } catch (error) {
          console.error(error);
        }
      }
  
      if (isAuthenticated) {
        console.log('getting user credit...');
        getUserCredit();
      }
    }, [isAuthenticated, dbUser._id, getAccessTokenSilently]);
  
   

const handleClaim = async (ideaId, userId, accessToken) => {
    try {
      const res = await axios.post(`/users/processClaim`, {  userId: userId,
        ideaId: ideaId, },  {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ); 
    console.log('inside handleClaim ideaId: ',ideaId);
    const { credits } = res.data;
    setUserCredit(credits);
    fetchIdea();

    } catch (error) {
      console.error(error);
       // if run into null idea, display an error message
      if (error.response && error.response.status === 404) {
        alert("Can't claim idea! Swipe left or right to continue");
      }
    }
  };

  const handleClaimClick = async () => {
    if (isAuthenticated) {
      try {
        console.log('inside handleClaimClick')
        const accessToken = await getAccessTokenSilently();
        await handleClaim(ideaId, dbUser._id, accessToken);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return isAuthenticated ? (
    <div>
      <p style={{ color: "white", fontFamily: 'Verdana, sans-serif' }}>Your Credit: {userCredit}</p>
      <button disabled={userCredit < 1} onClick={handleClaimClick}>
        Claim Idea
      </button>
    </div>
  ) : null;
};
export default ClaimButton