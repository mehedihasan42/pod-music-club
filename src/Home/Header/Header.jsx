import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import useCart from '../../useHooks/useCart';

const Header = () => {

  const {user,logOut} = useContext(AuthContext)
  const [,savedCart] = useCart()

  const handleLogOut = () =>{
    logOut()
    .then(()=>{})
    .catch(error=>console.log(error))
  }
  
    return (
     <>
     <div className="navbar bg-base-100">
  <div className="flex-1">
    <p className='text-2xl font-bold mx-auto' data-aos="fade-down" data-aos-delay="50" data-aos-duration="1000">Pathway Online Development</p>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      {
        user?<>
        <li><Link onClick={handleLogOut} className='btn btn-neutral btn-sm'>Log Out</Link></li></>: <>   
        <li><Link to="/signIn" className='btn btn-neutral btn-sm'>Log In</Link></li></>
      }
      <li><Link to="/secret" >Secret</Link></li>
      <li><button className="btn btn-neutral btn-sm">Saved<div className="badge">+{savedCart.length}</div></button></li>
   
    </ul>
  </div>
</div>
     </>
    );
};

export default Header;