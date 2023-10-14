import React, { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { FcGoogle } from 'react-icons/fc';
import { useLocation, useNavigate } from "react-router-dom";

const GoogleSignIn = () => {
  const { googleSignUp } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignUp =() =>{
    googleSignUp()
    .then(result=>{
      const loggedUser = result.user;
      console.log(loggedUser)
      navigate(from, { replace: true });
    })
  }
  return (
    <div>
      <div className="divider"></div> 
      <button onClick={handleGoogleSignUp} className="btn btn-circle btn-neutral">
       <FcGoogle className="text-3xl"/>
      </button>
    </div>
  );
};

export default GoogleSignIn;
