import React from "react";
import { Link, NavLink } from "react-router-dom";
import { NavbarSection } from "./navbarStyled";
import userImg from "../../assets/images/avatar.svg";
import {BsChevronDown} from "react-icons/bs";

export default function Navbar({ logoutHandler, userName }) {
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

        <div className="navbar__user">
          <div className="navbar__user-title">
            <img className="navbar__user-img" src={userImg} alt="avatar" />
            <BsChevronDown />
          </div>
          <div className="navbar__user-dropdown">
            <Link className="navbar__user-link" to="/user">
              {userName}
            </Link>
            <span className="navbar__user-link" onClick={logoutHandler}>
              Log out
            </span>
          </div>
        </div>
        <div className="navbar__toggle">
          <span className="navbar__toggle-icon"></span>
        </div>
      </div>
    </NavbarSection>
  );
}
