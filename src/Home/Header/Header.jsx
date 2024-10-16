import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import useCart from "../../useHooks/useCart";
import { GiHamburgerMenu } from "react-icons/gi";
import useAdmin from "../../useHooks/useAdmin";
import { IoMdAdd } from "react-icons/io";
import { RiAdminFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { CiSaveDown2 } from "react-icons/ci";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const [, savedCart] = useCart();
  const userRole = useAdmin();
  // console.log(userRole)

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="navbar bg-neutral text-neutral-content">
        <div className="flex-1">
        <Link to="/" className="btn  btn-ghost normal-case lg:text-2xl font-bold ">
        <span className="font-serif">Music</span>{" "}
        <span className="font-mono">Collection</span>
              </Link>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-16 rounded-full">
                <img src="https://i.ibb.co.com/K91fJzq/pod-image.jpg" alt="" />
                {/* {
            user? <img
            alt="https://i.ibb.co.com/K91fJzq/pod-image.jpg"
            src={user?.photoURL} />:<></>
          }    */}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow bg-base-300 text-black"
            >
              {userRole === "admin" && (
              <li>
                <Link to="/admin" className="">
                  Profile
                  <RiAdminFill className="" />
                </Link>
              </li>
            )}
            {userRole === "admin" && (
              <li>
                <Link to="/uses" className="">
                  Users
                  <FaUsers />
                </Link>
              </li>
            )}
            {userRole === "admin" && (
              <li>
                <Link to="/addItem" className="">
                  Add New
                  <IoMdAdd className="text-xl font-extrabold" />
                </Link>
              </li>
            )}
             <li>
              <Link to="/saved" className="">
                Saved <CiSaveDown2 className="2xl"/><div className="badge">+{savedCart.length}</div>
              </Link>
            </li>
              {user ? (
              <>
                <li>
                  <Link
                    onClick={handleLogOut} className=""
                  >
                    Log Out
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/signIn">
                    Log In
                  </Link>
                </li>
              </>
            )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
