import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRouter = ({children}) => {
     
    const {user} = useContext(AuthContext)
    const location = useLocation();

    if(user){
        return children;
    }

    return <Navigate to="/signIn" state={{from:location}} replace></Navigate>
};

export default PrivateRouter;