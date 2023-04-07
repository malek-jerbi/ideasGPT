import { useAuth0 } from "@auth0/auth0-react";
import { React, useContext } from 'react'
import AuthContext from "./AuthContext";




function LogoutButton() {
  
  
  
    const { logout, isAuthenticated } = useAuth0();
    const {setdbUser } = useContext(AuthContext);

    const logoutUser = async () => {

        logout();
        setdbUser(null);

    }
  

  return (

    isAuthenticated && (
        <button onClick={() => logoutUser()}>
            Sign Out
        </button>
    )
  )
}

export default LogoutButton