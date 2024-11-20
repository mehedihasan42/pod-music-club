import React from 'react';
import useAuth from '../useHooks/useAuth';
import useAdmin from '../useHooks/useAdmin';
import { Navigate } from 'react-router-dom';

const AdminRouter = ({children}) => {
    const {user,loading} = useAuth()
    const userRole = useAdmin()

    if(loading){
        <span className="loading loading-spinner loading-lg"></span>
    }

    if(user && userRole){
        return children;
    }

    return <Navigate to="/"></Navigate>
};

export default AdminRouter;