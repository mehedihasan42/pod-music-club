import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Header/Header';
import { AuthContext } from '../../../Provider/AuthProvider';

const Admin = () => {
  const {user} = useContext(AuthContext)
    return (
       <>
       <Header/>
        <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
         Hi, <h2 className='text-xl'>{user?.email}</h2>
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
            Open drawer
          </label>
        </div>
        <div className="drawer-side fixed">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li><Link to="/addItem">Add Item</Link></li>
            <li><Link to="/saved">Saved</Link></li>
            <li><Link to="/uses">Userd</Link></li>
          </ul>
        </div>
      </div>
       </>
    );
};

export default Admin;