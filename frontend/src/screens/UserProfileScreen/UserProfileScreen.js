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

    // Add code to display "Hello" followed by user's name
    // q: where can I find the user's name?
    // a: it's in the dbUser object
    // q: how do I access the dbUser object?
    // a: use the useContext hook
    // q: how do I use the useContext hook?
    // a: import the AuthContext.js file and use the useContext hook
    // q: where can I find the AuthContext.js file?
    // a: it's in the components folder
    // q: how do I import the AuthContext.js file?
    // a: import AuthContext from "../../components/AuthContext.js";
    // q: how do I use the useContext hook?
    // a: const { dbUser, setdbUser } = useContext(AuthContext);
    // q: how do I access the dbUser object?
    // a: dbUser
    // q: how do I access the user's name?
    // a: dbUser.name
    // q: how do I display the user's name?
    // a: {dbUser.name}
    // q: how do I display "Hello" followed by the user's name?
    // a: Hello {dbUser.name}
    // q: how do I display "Hello" followed by the user's name in a <h1> tag?
    // a: <h1>Hello {dbUser.name}</h1>
    // q: how do I display "Hello" followed by the user's name in a <h1> tag in the center of the screen?
    // a: <h1 style={{textAlign: "center"}}>Hello {dbUser.name}</h1>
    // q: how do I display "Hello" followed by the user's name in a <h1> tag in the center of the screen with a background color of #F5F5F5?
    // a: <h1 style={{textAlign: "center", backgroundColor: "#F5F5F5"}}>Hello {dbUser.name}</h1>
    // q: how do I display "Hello" followed by the user's name in a <h1> tag in the center of the screen with a background color of #F5F5F5 and a border radius of 50?
    // a: <h1 style={{textAlign: "center", backgroundColor: "#F5F5F5", borderRadius: 50}}>Hello {dbUser.name}</h1>
    // q: how do I display "Hello" followed by the user's name in a <h1> tag in the center of the screen with a background color of #F5F5F5 and a border radius of 50 and a box shadow?
    // a: <h1 style={{textAlign: "center", backgroundColor: "#F5F5F5", borderRadius: 50, boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)"}}>Hello {dbUser.name}</h1>

    

    <StyledBox>

      <UsersIdeaTable likedIdeas={dbUser?.likedIdeas}></UsersIdeaTable>

    </StyledBox>

  )
}

export default UserProfileScreen;