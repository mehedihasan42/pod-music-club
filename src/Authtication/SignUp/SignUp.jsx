import React from 'react';

const SignUp = () => {
   
  
    return (
     <>
      <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col">
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body">
        <h2 className='font-bold text-2xl'>Sign Up</h2>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered" required />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-neutral">Login</button>
        </div>
      </form>
    </div>
  </div>
</div>
     </>
    );
};

export default SignUp;