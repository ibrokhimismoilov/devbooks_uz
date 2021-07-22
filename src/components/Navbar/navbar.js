import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { NavbarSection } from "./navbarStyled";
import userImg from "../../assets/images/avatar.svg";
import { BsChevronDown } from "react-icons/bs";

export default function Navbar({ logout, }) {
  const [mobileToggler, setMobileToggler] = useState(false);
  const {firstName} = JSON.parse(localStorage.getItem("user"));

  const logoutHandler = () => {
    setMobileToggler(false); 
    logout();
  }

  return (
    <NavbarSection className="navbar">
      <div className="auto-container">
        <Link
          onClick={() => setMobileToggler(false)}
          to="/"
          className="navbar__logo"
        >
          Badiiyat
        </Link>

        <nav className={mobileToggler ? "navbar__nav open" : "navbar__nav"}>
          <NavLink
            onClick={() => setMobileToggler(false)}
            exact
            to="/"
            className="navbar__nav-link"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setMobileToggler(false)}
            exact
            to="/authors"
            className="navbar__nav-link"
          >
            Authors
          </NavLink>
          <NavLink
            onClick={() => setMobileToggler(false)}
            exact
            to="/books"
            className="navbar__nav-link"
          >
            Books
          </NavLink>
        </nav>

        <div className="navbar__user">
          <div className="navbar__user-title">
            <img className="navbar__user-img" src={userImg} alt="avatar" />
            <BsChevronDown />
          </div>
          <div className="navbar__user-dropdown">
            <Link
              onClick={() => setMobileToggler(false)}
              className="navbar__user-link"
              to="/user"
            >
              {firstName}
            </Link>
            <Link
              onClick={() => setMobileToggler(false)}
              className="navbar__user-link"
              to="/user-settings"
            >
              Settings
            </Link>
            <span
              className="navbar__user-link"
              onClick={logoutHandler}
            >
              Log out
            </span>
          </div>
        </div>
        <div
          onClick={() => setMobileToggler((state) => !state)}
          className={`navbar__toggle ${mobileToggler  ? "open" : ""}`}
        >
          <span className="navbar__toggle-icon"></span>
        </div>
      </div>
    </NavbarSection>
  );
}
