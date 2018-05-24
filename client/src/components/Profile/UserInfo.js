import React from "react";
import { Link } from "react-router-dom";

const formatDate = date => {
  const newDate = new Date(date).toLocaleDateString("en-US");
  const newTime = new Date(date).toLocaleTimeString("en-US");
  return `${newDate} at ${newTime}`;
};

const UserInfo = ({ username, email, joinDate, favorites }) => (
  <div className="App" style={{ marginBottom: "2em" }}>
    <h3>User Info</h3>
    <p>Username: {username}</p>
    <p>Email: {email}</p>
    <p>Joined: {formatDate(joinDate)}</p>
    <ul>
      <h3>{username}'s Favorites</h3>
      {favorites.map(favorite => (
        <Link key={favorite._id} to={`/recipes/${favorite._id}`}>
          <li>{favorite.name}</li>
        </Link>
      ))}
      {!favorites.length && (
        <h4>You have no favorites currently. Go add some!</h4>
      )}
    </ul>
  </div>
);

export default UserInfo;
