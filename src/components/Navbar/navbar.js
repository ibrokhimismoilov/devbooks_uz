import React from "react";
import { Link, NavLink } from "react-router-dom";
import { NavbarSection } from "./navbarStyled";

export default function Navbar({ logged, setLoggedFunc }) {
  
  const logoutHandler = () => {
    localStorage.removeItem("token");
    setLoggedFunc(false)
  };

  return (
    <NavbarSection className="navbar">
      <div className="auto-container">
        <Link to="/" className="navbar__logo">
          Badiiyat
        </Link>

        <nav className="navbar__nav">
          <NavLink exact to="/" className="navbar__nav-link">
            Home
          </NavLink>
          <NavLink exact to="/authors" className="navbar__nav-link">
            Authors
          </NavLink>
          <NavLink exact to="/books" className="navbar__nav-link">
            Books
          </NavLink>
        </nav>

        {logged ? (
          <div className="navbar__user">
            {/* <img src="" alt="" /> */}
            <span  className="navbar__auth-link" onClick={logoutHandler}>
              Log out
            </span>
          </div>
        ) : (
          <div className="navbar__auth">
            <NavLink exact to="/sign-in" className="navbar__auth-link">
              Sign in
            </NavLink>
            <NavLink exact to="/sign-up" className="navbar__auth-link">
              Sign up
            </NavLink>
          </div>
        )}

        <div className="navbar__toggle">
          <span className="navbar__toggle-icon"></span>
        </div>
      </div>
    </NavbarSection>
  );
}
