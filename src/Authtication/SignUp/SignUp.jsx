import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
   
  const handleSubmit = event =>{
     event.preventDefault()
     const form = event.target;
     const email = form.email.value;
     const password = form.password.value;
     console.log(email,password)

  }
  
    return (
     <>
      <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col">
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleSubmit} className="card-body">
        <h2 className='font-bold text-2xl'>Sign Up</h2>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" placeholder="password" className="input input-bordered" required />
        </div>
        <div className="form-control mt-6">
          <button type='submit' className="btn btn-neutral">Sign Up</button>
        </div>
      </form>
      <Link to="/signIn">Log In</Link>
    </div>
  </div>
</div>
     </>
    );
};

export default SignUp;