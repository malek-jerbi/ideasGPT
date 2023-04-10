import React, { useEffect, useContext, useCallback } from 'react';
import { Box } from '@mui/material';
import AuthContext from "../../components/AuthContext.js";
import { styled } from '@mui/system'
import UsersIdeaTable from '../../components/UsersIdeaTable/UsersIdeaTable.js';
import { useAuth0 } from "@auth0/auth0-react";
import userApi from '../../api/UserApi.js';
import ClaimedIdeas from '../../components/ClaimedIdeas';

const StyledBox = styled(Box)({
  color: "6B068",
  backgroundColor: "#F5F5F5",
  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
  margin: "auto",
  marginTop: 25,
  borderRadius: 50,
  height: 1000,
  width: 1000,
  display: "flex",
  justifyContent: "center",
  padding: 50,
});

const UserProfileScreen = () => {
  const { dbUser, setDbUser } = useContext(AuthContext);
  const { getAccessTokenSilently } = useAuth0();

  const getUserInfo = useCallback(async () => {
    if (!dbUser || !dbUser._id) return;

    try {
      const access_token = await getAccessTokenSilently();
      console.log(dbUser);

      const apiCall = await userApi.getUserByID(dbUser._id, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      setDbUser(apiCall.data);
    } catch (error) {}

  }, [getAccessTokenSilently, dbUser, setDbUser]);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  if (!dbUser) {
    return <div>Loading...</div>;
  }

  return (
    <StyledBox id="userProfile">
      <UsersIdeaTable likedIdeas={dbUser?.likedIdeas}></UsersIdeaTable>
      <ClaimedIdeas claimedIdeas={dbUser?.claimedIdeas}></ClaimedIdeas>
    </StyledBox>
  );
}

export default UserProfileScreen;
