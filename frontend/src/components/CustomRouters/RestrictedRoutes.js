import React from "react";
import { Route, useLocation, Navigate } from "react-router-dom";
import {useAuth0 } from '@auth0/auth0-react'


const RestrictedRoutes = ({ children }) => {

    const {isAuthenticated} = useAuth0();
    const { state } = useLocation();

        if (!isAuthenticated) {
          // user is not authenticated
          return <Navigate to="/" />;
        }
        return children;
   

}

export default RestrictedRoutes