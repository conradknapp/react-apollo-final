import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";

import Error from "../Error";
import { SIGNIN_USER } from "../../queries";

const initialState = {
  username: "",
  password: ""
};

class Signin extends Component {
  state = { ...initialState };

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event, signinUser) => {
    event.preventDefault();
    signinUser().then(async ({ data }) => {
      // console.log(data);
      localStorage.setItem("token", data.signinUser.token);
      this.props.refetch();
      const { from } = this.props.location.state || { from: { pathname: "/" } };
      this.clearState();
      this.props.history.push(from);
    });
  };

  clearState = () => {
    this.setState({ ...initialState });
  };

  validateForm = () => {
    const { username, password } = this.state;
    const isInvalid = !username || !password;
    return isInvalid;
  };

  render() {
    const { username, password } = this.state;
    const { from } = this.props.location.state || { from: { pathname: "/" } };

    return (
      <React.Fragment>
        {from.pathname !== "/" && (
          <h2 className="App">
            You must be logged in to access {from.pathname}
          </h2>
        )}
        <h2 className="App">Sign in</h2>
        <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
          {(signinUser, { data, loading, error }) => (
            <form
              className="form"
              onSubmit={event => this.handleSubmit(event, signinUser)}
            >
              <input
                name="username"
                onChange={this.handleChange}
                value={username}
                type="text"
                placeholder="Username"
              />
              <input
                name="password"
                onChange={this.handleChange}
                value={password}
                type="password"
                placeholder="Password"
              />
              <button
                disabled={loading || this.validateForm()}
                type="submit"
                className="button-primary"
              >
                Submit
              </button>
              {error && <Error error={error} />}
            </form>
          )}
        </Mutation>
      </React.Fragment>
    );
  }
}

export default withRouter(Signin);
