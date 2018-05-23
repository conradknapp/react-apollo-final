import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";

import Error from "../Error";
import { SIGNUP_USER } from "../../queries";

const initialState = {
  username: "",
  email: "",
  password: "",
  passwordConfirmation: ""
};

class Signup extends Component {
  state = { ...initialState };

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event, signupUser) => {
    event.preventDefault();
    signupUser().then(async ({ data }) => {
      // console.log(data);
      localStorage.setItem("token", data.signupUser.token);
      await this.props.refetch();
      this.clearState();
      this.props.history.push("/");
    });
  };

  clearState = () => {
    this.setState({ ...initialState });
  };

  validateForm = () => {
    const { username, email, password, passwordConfirmation } = this.state;
    const isInvalid =
      !username || !email || !password || password !== passwordConfirmation;
    return isInvalid;
  };

  render() {
    const { username, email, password, passwordConfirmation } = this.state;

    return (
      <React.Fragment>
        <h2 className="App">Sign Up</h2>
        <Mutation
          mutation={SIGNUP_USER}
          variables={{ username, email, password }}
        >
          {(signupUser, { data, loading, error }) => (
            <form
              className="App"
              onSubmit={event => this.handleSubmit(event, signupUser)}
            >
              <input
                name="username"
                onChange={this.handleChange}
                value={username}
                type="text"
                placeholder="Username"
              />
              <input
                name="email"
                onChange={this.handleChange}
                value={email}
                type="text"
                placeholder="Email Address"
              />
              <input
                name="password"
                onChange={this.handleChange}
                value={password}
                type="password"
                placeholder="Password"
              />
              <input
                name="passwordConfirmation"
                value={passwordConfirmation}
                onChange={this.handleChange}
                type="password"
                placeholder="Confirm Password"
              />
              <button disabled={loading || this.validateForm()} type="submit">
                Sign Up
              </button>
              {error && <Error error={error} />}
            </form>
          )}
        </Mutation>
      </React.Fragment>
    );
  }
}

export default withRouter(Signup);
