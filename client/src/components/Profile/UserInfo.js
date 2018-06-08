import React from "react";
import { Link } from "react-router-dom";

import Spinner from "../Spinner";

const formatDate = date => {
  const newDate = new Date(date).toLocaleDateString("en-US");
  const newTime = new Date(date).toLocaleTimeString("en-US");
  return `${newDate} at ${newTime}`;
};

const UserInfo = ({ session, loading }) => {
  if (loading) return <Spinner />;
  return (
    <div className="App" style={{ marginBottom: "2em" }}>
      <h3>User Info</h3>
      <p>Username: {session.getCurrentUser.username}</p>
      <p>Email: {session.getCurrentUser.email}</p>
      <p>Joined: {formatDate(session.getCurrentUser.joinDate)}</p>
      <ul>
        <h3>{session.getCurrentUser.username}'s Favorites</h3>
        {session.getCurrentUser.favorites.map(favorite => (
          <Link key={favorite._id} to={`/recipes/${favorite._id}`}>
            <li>{favorite.name}</li>
          </Link>
        ))}
        {!session.getCurrentUser.favorites.length && (
          <p>You have no favorites currently. Go add some!</p>
        )}
      </ul>
    </div>
  );
};

export default UserInfo;
