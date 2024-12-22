import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Link, Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../useHooks/useAdmin';
import Waiting from '../Components/Waiting/Waiting';

const PrivateRouter = ({children}) => {
     
    const {user,loading} = useContext(AuthContext)
    const location = useLocation();
    const userRole = useAdmin()

    if(loading){
        return <span className="loading loading-spinner loading-lg"></span>;
       }

    if(user && (userRole === 'approve' || userRole === 'admin')){
        return children;
   }
   

        return  <p className='text-3xl text-red-700'>Sorry! You are an invalid user.<Link to="/signIn">Go back to <p className='inline text-blue-600'>Login Page</p>.</Link> <p>Or, wait for Admin Approval</p></p>
    // return <Navigate to="/signIn" state={{from:location}} replace></Navigate>
   
};

export default PrivateRouter;