import React, { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { FcGoogle } from 'react-icons/fc';
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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
        navigate("/");
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'success',
          title: 'Loged in successfully'
        })
        if(data.insertedId){
          const loggedUser = result.user;
          console.log(loggedUser)
          
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
