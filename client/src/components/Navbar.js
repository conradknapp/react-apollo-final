import React from "react";
import { Link } from "react-router-dom";

import Signout from "./Auth/Signout";

const Navbar = ({ session }) => (
  <nav className="App">
    {session && session.getCurrentUser ? (
      <NavbarAuth session={session} />
    ) : (
      <NavbarUnAuth />
    )}
  </nav>
);

const NavbarAuth = ({ session }) => (
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/search">Search</Link>
    </li>
    <li>
      <Link to="/recipe/add">Add Recipe</Link>
    </li>
    {session && (
      <li>
        <Link to="/profile">Profile</Link>
      </li>
    )}
    <li>
      <Signout />
    </li>
    <h3>Welcome, {session.getCurrentUser.username}</h3>
  </ul>
);

const NavbarUnAuth = () => (
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/search">Search</Link>
    </li>
    <li>
      <Link to="/signin">Sign In</Link>
    </li>
    <li>
      <Link to="/signup">Sign Up</Link>
    </li>
  </ul>
);

export default Navbar;
