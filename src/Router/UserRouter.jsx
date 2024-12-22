import React from 'react';
import useAuth from '../useHooks/useAuth';
import useAdmin from '../useHooks/useAdmin';
import { Navigate } from 'react-router-dom';

const UserRouter = ({children}) => {
    const {user,loading} = useAuth()
    const userRole = useAdmin()
    const validUser = userRole === "approve";

    if(loading){
        <span className="loading loading-spinner loading-lg"></span>
    }

    if(user && validUser){
        return children;
    }

    return <Navigate to="/"></Navigate>
};

export default UserRouter;