import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

  
    return (
     <>
     <div className="navbar bg-base-100">
  <div className="flex-1">
    <p className='text-2xl font-bold mx-auto' data-aos="fade-down" data-aos-delay="50" data-aos-duration="1000">Pathway Online Development</p>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      <li><Link to="/signIn" className='btn btn-neutral btn-sm'>Log In</Link></li>
    </ul>
  </div>
</div>
     </>
    );
};

export default Header;