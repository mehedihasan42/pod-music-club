import React from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import GoogleSignIn from "../GoogleSignIn/GoogleSignIn";

const SignUp = () => {
  const {createUser} = useContext(AuthContext)
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email,data.password)
    .then(result=>{
      const infos = {email:data.email}
      fetch('https://pod-music-server.onrender.com/api/users',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(infos)
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
  };
  
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <h2 className="font-bold text-2xl">Sign Up</h2>
              <div className="form-control">
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="form-control">
                <input
                  type="password"
                  {...register("password", { required: true, minLength: 6 })}
                  placeholder="password"
                  className="input input-bordered"
                />
                {errors.password?.type === "required" && (
                  <span className="text-red-500">Password is required</span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-red-500">
                    Password must be at least 6 characters long
                  </span>
                )}
              </div>
              <div className="form-control">
                <button type="submit" className="btn btn-neutral">
                  Sign Up
                </button>
              </div>
            </form>
           <span>Already have an account? Go to  <Link to="/signIn" className="text-blue-500 underline">Log In</Link></span>
           <GoogleSignIn/>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
