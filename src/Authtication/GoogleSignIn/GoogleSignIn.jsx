import React, { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { FcGoogle } from 'react-icons/fc';

const GoogleSignIn = () => {
  const { googleSignUp } = useContext(AuthContext);

  const handleGoogleSignUp =() =>{
    googleSignUp()
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
