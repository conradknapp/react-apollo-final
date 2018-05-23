import React from "react";

import UserInfo from "./UserInfo";
import withAuth from '../withAuth';

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
    return <UserInfo {...this.state} />;
  }
}

export default withAuth(session =>
  session &&
  session.getCurrentUser)(Profile);
