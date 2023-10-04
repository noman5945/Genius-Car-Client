import React, { useContext } from "react";
import logo from "../../../assets/logo.svg";
import { Link } from "react-router-dom";
import { context } from "../../../Context/AuthProvider/AuthProvider";

const Header = () => {
  const { user, logOut } = useContext(context);
  const handleSignout = () => {
    logOut().then().catch();
  };
  const menuItems = (
    <>
      <li className="font-semibold list-none mx-2">
        <Link to="/">Home</Link>
      </li>
      {user?.email ? (
        <>
          <li className="font-semibold list-none mx-2">
            <Link to="/orders">Orders</Link>
          </li>
          <li className="font-semibold list-none mx-2">
            <button onClick={handleSignout} className="btn-ghost">
              Sign Out
            </button>
          </li>
        </>
      ) : (
        <li className="font-semibold list-none mx-2">
          <Link to="/login">Login</Link>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 h-20 mb-12 pt-12">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          <img src={logo} alt="" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">{menuItems}</div>
      <div className="navbar-end">
        <button className="btn btn-outline btn-error">Appoinment</button>
      </div>
    </div>
  );
};

export default Header;
