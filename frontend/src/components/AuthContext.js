import React, { createContext, useState } from "react";
const AuthContext = createContext();

// Used to keep track of if the current user is logged in
function AuthContextProvider(props) {

  const [userID, setUserID] = useState(undefined);
 

  // Allows other components to update the loggedIn
  return (
    <AuthContext.Provider
      value={{
        userID,
        setUserID,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };