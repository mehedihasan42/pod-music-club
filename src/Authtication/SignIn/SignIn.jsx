import React from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import GoogleSignIn from "../GoogleSignIn/GoogleSignIn";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    console.log(data);
    loginUser(data.email, data.password)
    .then(result=>{
      const loggedUser = result.user;
      console.log(loggedUser)

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
      navigate(from, { replace: true });
    })
  };
  
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <h2 className="font-bold text-2xl">Log In</h2>
              <div className="form-control">
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="email"
                  className="input input-bordered rounded-md"
                />
                {errors.email && (
                  <span className="text-red-500">Email is required</span>
                )}
              </div>
              <div className="form-control">
                <input
                  type="password"
                  {...register("password", { required: true })}
                  placeholder="password"
                  className="input input-bordered rounded-md"
                />
                {errors.password?.type === "required" && (
                  <span className="text-red-500">Password is required</span>
                )}
              </div>
              <div className="form-control">
                <button type="submit" className="btn btn-neutral rounded-md hover:bg-white hover:text-black">
                  Log in
                </button>
              </div>
            </form>
          <span>New User? Go to <Link to="/signup" className="text-blue-500 underline">Sign Up</Link></span>
            <GoogleSignIn/>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
