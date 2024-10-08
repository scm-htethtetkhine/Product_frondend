import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const RouteGuard = ({ allowedRoles }) => {
    let rolesArray = [];
    const userRoles = window.localStorage.getItem("role");

    if (userRoles) {
        rolesArray.push(userRoles)
    }
     const hasRole = allowedRoles.some((role) => userRoles.includes(role));
    
    console.log(allowedRoles , userRoles);

    if (!hasRole) {
        localStorage.setItem("loginError" , "Login Denied Your Account");
        return <Navigate to="/" />
    }
  return (
    <Outlet />
  )
}

export default RouteGuard