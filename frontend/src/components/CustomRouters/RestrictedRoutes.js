import React from "react";
import { Navigate } from "react-router-dom";
import {useAuth0 } from '@auth0/auth0-react'


const RestrictedRoutes = ({ children }) => {

    const {isAuthenticated} = useAuth0();

        if (!isAuthenticated) {
          // user is not authenticated
          return <Navigate to="/" />;
        }
        return children;
   

}

export default RestrictedRoutes