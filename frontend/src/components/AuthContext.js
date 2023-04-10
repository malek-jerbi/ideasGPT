import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import UserApi from "../api/UserApi";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [dbUser, setDbUser] = useState(undefined);

  useEffect(() => {
    if (isAuthenticated && user) {
      const getUser = async () => {
        try {
          const token = await getAccessTokenSilently();
          const userData = await UserApi.getUserByID(user.sub, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setDbUser(userData.data);
        } catch (error) {
          console.log("Error fetching user:", error);
        }
      };

      getUser();
    } else {
      setDbUser(undefined);
    }
  }, [isAuthenticated, user, getAccessTokenSilently]);

  return (
    <AuthContext.Provider
      value={{
        dbUser,
        setDbUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

const useAuthContext = () => useContext(AuthContext);

export default AuthContext;
export { AuthContextProvider, useAuthContext };
