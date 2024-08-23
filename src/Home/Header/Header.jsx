import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import useCart from "../../useHooks/useCart";
import { GiHamburgerMenu } from 'react-icons/gi';
import useAdmin from "../../useHooks/useAdmin";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const [, savedCart] = useCart();
  const userRole = useAdmin()
  // console.log(userRole)

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown shadow rounded">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
             <GiHamburgerMenu className="text-2xl"/>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-2"
            >
              <li>
                <Link to="/" className="btn btn-neutral btn-xs">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/saved" className="btn btn-neutral btn-xs">
                  Saved<div className="badge">+{savedCart.length}</div>
                </Link>
              </li>
              {user ? (
                <>
                  <li>
                    <Link
                      onClick={handleLogOut}
                      className="btn btn-neutral btn-xs"
                    >
                      Log Out
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/signIn" className="btn btn-neutral btn-sm">
                      Log In
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <a className="btn btn-ghost normal-case lg:text-2xl font-bold">
         Music Collection
          </a>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2 space-y-2 lg:space-y-0 grid lg:flex">
            <li>
              <Link to="/" className="btn btn-neutral btn-sm">
                Home
              </Link>
            </li>
            {
              userRole ==="admin"&&(
                <li>
                <Link to="/admin" className="btn btn-neutral btn-sm">
                  Profile
                </Link>
              </li>
              )
            }   
            <li>
              <Link to="/saved" className="btn btn-neutral btn-sm">
                Saved<div className="badge">+{savedCart.length}</div>
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link
                    onClick={handleLogOut}
                    className="btn btn-neutral btn-sm"
                  >
                    Log Out
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/signIn" className="btn btn-neutral btn-sm">
                    Log In
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      {/* <div className="navbar bg-base-100 flex justify-between">
  <div className="">
    <p className='lg:text-2xl font-bold mx-auto' data-aos="fade-down" data-aos-delay="50" data-aos-duration="1000">Pathway Online Development</p>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1 space-x-2 space-y-2 lg:space-y-0 grid lg:flex">
    <li><Link to="/" className='btn btn-neutral btn-sm'>Home</Link></li>
    <li><Link to="/saved" className="btn btn-neutral btn-sm">Saved<div className="badge">+{savedCart.length}</div></Link></li>
      {
        user?<>
        <li><Link onClick={handleLogOut} className='btn btn-neutral btn-sm'>Log Out</Link></li></>: <>   
        <li><Link to="/signIn" className='btn btn-neutral btn-sm'>Log In</Link></li></>
      }
    </ul>
  </div>
</div> */}
    </>
  );
};

export default Header;
