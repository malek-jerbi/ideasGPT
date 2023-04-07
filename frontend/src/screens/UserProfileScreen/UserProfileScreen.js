import { React, useEffect, useContext } from 'react';
import { Box } from '@mui/material';
import AuthContext from "../../components/AuthContext.js";
import {styled } from '@mui/system'
import UsersIdeaTable from '../../components/UsersIdeaTable/UsersIdeaTable.js';
import { useAuth0 } from "@auth0/auth0-react";
import userApi from '../../api/UserApi.js';



/* q: Why am I getting the following error when I try to use the styled function from @mui/system?
ERROR in ./src/screens/UserProfileScreen/UserProfileScreen.js 13:18-24
export 'styled' (imported as 'styled') was not found in '@mui/system' (module has no exports)*/

// q: answer the question above
// a: I had to install the @mui/styled-engine-sc package to get the styled function to work

const StyledBox = styled(Box,{})({
  color:"6B068",
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

  const { dbUser, setdbUser } = useContext(AuthContext);
  const {getAccessTokenSilently} = useAuth0();


  useEffect(() => {  
   
  getUserInfo();
   
  
  },[]);

  const getUserInfo = async () => {

    try {
      const access_token = await getAccessTokenSilently();
      console.log(dbUser);
    
      const apiCall =  await userApi.getUserByID(dbUser._id, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        }
      });

      setdbUser(apiCall.data.data);

      
  } catch (error) {
    
    
  }

};


  return (

    
    <StyledBox id="userProfile">

      <UsersIdeaTable likedIdeas={dbUser?.likedIdeas}></UsersIdeaTable>
      
    </StyledBox>

  )
}

export default UserProfileScreen;