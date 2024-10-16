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
      const user = result.user;
      console.log(user)
      const saveUser = {name:user.displayName,email:user.email,photo:user.photoURL}
      fetch('https://pod-music-server.onrender.com/api/users',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(saveUser)
      })
      .then(res=>res.json())
      .then(data=>{
        if(data.insertedId){
          const loggedUser = result.user;
          console.log(loggedUser)
          navigate(from, { replace: true });
        }
      })
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
