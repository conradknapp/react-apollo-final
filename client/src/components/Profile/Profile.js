import React from "react";

import UserInfo from "./UserInfo";
import UserRecipes from "./UserRecipes";
import withAuth from "../withAuth";

class Profile extends React.Component {
  state = {
    username: "",
    email: "",
    joinDate: "",
    favorites: []
  };

  componentDidMount() {
    if (!this.props.loading) {
      const {
        username,
        email,
        joinDate,
        favorites
      } = this.props.session.getCurrentUser;
      this.setState({
        username,
        email,
        joinDate,
        favorites
      });
    }
  }

  render() {
    if (this.props.loading) return <div className="App">Loading</div>;
    return (
      <div>
        <UserInfo {...this.state} />
        <UserRecipes {...this.props} />
      </div>
    );
  }
}

export default withAuth(session => session && session.getCurrentUser)(Profile);
