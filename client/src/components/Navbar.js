import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

import Signout from "./Auth/Signout";

const Navbar = ({ session }) => (
  <nav>
    {session && session.getCurrentUser ? (
      <NavbarAuth session={session} />
    ) : (
      <NavbarUnAuth />
    )}
  </nav>
);

const NavbarAuth = ({ session }) => (
  <Fragment>
    <ul>
      <li>
        <NavLink to="/" exact activeClassName="active">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/search" activeClassName="active">
          Search
        </NavLink>
      </li>
      <li>
        <NavLink to="/recipe/add" activeClassName="active">
          Add Recipe
        </NavLink>
      </li>
      {session && (
        <li>
          <NavLink to="/profile" activeClassName="active">
            Profile
          </NavLink>
        </li>
      )}
      <li>
        <Signout />
      </li>
    </ul>
    <h4>
      Welcome, <strong>{session.getCurrentUser.username}</strong>
    </h4>
  </Fragment>
);

const NavbarUnAuth = () => (
  <ul>
    <li>
      <NavLink to="/" exact activeClassName="active">
        Home
      </NavLink>
    </li>
    <li>
      <NavLink to="/search" activeClassName="active">
        Search
      </NavLink>
    </li>
    <li>
      <NavLink to="/signin" activeClassName="active">
        Sign In
      </NavLink>
    </li>
    <li>
      <NavLink to="/signup" activeClassName="active">
        Sign Up
      </NavLink>
    </li>
  </ul>
);

export default Navbar;
