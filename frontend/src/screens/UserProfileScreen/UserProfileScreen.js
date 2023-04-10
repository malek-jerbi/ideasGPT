import { React, useEffect, useContext, useState } from 'react';
import AuthContext from "../../components/AuthContext.js";
import UsersIdeaTable from '../../components/UsersIdeaTable/UsersIdeaTable.js';
import { useAuth0 } from "@auth0/auth0-react";
import userApi from '../../api/UserApi.js';


const UserProfileScreen = () => {

  const { dbUser, setdbUser } = useContext(AuthContext);
  const {likedIdeas, setLikedIdeas} = useState(null);
  const {getAccessTokenSilently} = useAuth0();


  useEffect(() => {  
   
  getUserInfo();
   
  
  },[]);

  const getUserInfo = async () => {

    try {
      const access_token = await getAccessTokenSilently();

      const apiCall =  await userApi.getUserByID(dbUser._id, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        }
      });

      console.log(apiCall.data.data);
      setdbUser(apiCall.data.data);


 /* Create another API endpoint for retrieving users liked ideas -> it retrieves all the users liked ideas(containg the text id...) and sets
  them to the likedIdeas variable  which can be passed on to the User Table component */ 

      const apiCall2 = await userApi.getUserLikedIdeas(dbUser._id, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        }
      });

      console.log(apiCall2);
      setLikedIdeas(apiCall2);


      // TODO: you can do the same here for claimed Ideas, I creating a Endpoint for that as well, but u have to create the variable for it 

      
  } catch (error) {
    
    
  }

};


  return (

    <UsersIdeaTable swipedIdeas={dbUser?.swipedIdeas}></UsersIdeaTable>

  )
}

export default UserProfileScreen;