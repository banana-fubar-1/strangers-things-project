import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <div>
      {isLoggedIn ? (
        <>
          <Link to="/">Home </Link>
          <Link to="/profile/:username">Profile</Link>
          <button
            onClick={() => {
              setIsLoggedIn(false);
              localStorage.removeItem("token");
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/">Home </Link>
          <Link to="/register">Register </Link>
          <Link to="/login">Login </Link>
        </>
      )}
    </div>
  );
};

export default NavBar;
