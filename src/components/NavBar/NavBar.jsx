import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ isLoggedIn, setIsLoggedIn, myUsername }) => {
  return (
    <div className="pb-8 pt-5">
      {isLoggedIn ? (
        <>
          <nav className=" flex  items-center justify-between px-2 py-3 bg-slate-500 mb-3 sticky top-0 ">
            <div className="container px-4 mx-auto flex  items-center justify-between ">
              <div className="w-full sticky top-0 flex justify-start lg:w-auto lg:static lg:block lg:justify-start ">
                <Link to="/">
                  <button className="bg-slate-900 mx-2">Home</button>
                </Link>
                <Link to={`/profile/${myUsername}`}>
                  <button className="bg-slate-900">Profile</button>
                </Link>
                <button
                  className="bg-slate-900 mx-2"
                  onClick={() => {
                    setIsLoggedIn(false);
                    localStorage.removeItem("token");
                  }}
                >
                  Logout
                </button>
              </div>
              <h1 className="text-3xl font-medium text-gray-900 dark:text-white pb-4 lg:pr-4">
                Welcome to Stranger's Things
              </h1>
            </div>
          </nav>
        </>
      ) : (
        <>
          <nav className=" flex items-center justify-between px-2 py-3 bg-slate-500 mb-3 sticky top-0 ">
            <div className="container px-4 mx-auto flex items-center justify-between ">
              <div className=" sticky top-0 flex justify-between lg:w-auto lg:static lg:block lg:justify-start ">
                <Link to="/">
                  <button className="mx-2 bg-slate-900">Home </button>
                </Link>
                <Link to="/register">
                  <button className="bg-slate-900">Register</button>
                </Link>
                <Link to="/login">
                  <button className="mx-2 bg-slate-900">Login</button>
                </Link>
              </div>
              <h1 className="text-3xl font-medium text-gray-900 dark:text-white pb-4 lg:pr-4">
                Welcome to Stranger's Things
              </h1>
            </div>
          </nav>
        </>
      )}
    </div>
  );
};

export default NavBar;
