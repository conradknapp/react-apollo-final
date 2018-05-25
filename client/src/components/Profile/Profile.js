import React from "react";

import UserInfo from "./UserInfo";
import UserRecipes from "./UserRecipes";
import withAuth from "../withAuth";

const Profile = props => {
  if (props.loading) return <div className="App">Loading</div>;
  return (
    <div>
      <UserInfo {...props} />
      <UserRecipes {...props} />
    </div>
  );
};

export default withAuth(session => session && session.getCurrentUser)(Profile);
