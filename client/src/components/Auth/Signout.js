import React from "react";
import { ApolloConsumer } from "react-apollo";
import { withRouter } from "react-router-dom";

export const signOut = (client, history) => {
  localStorage.removeItem("token");
  client.resetStore();
  history.push("/");
};

const Signout = ({ history }) => (
  <ApolloConsumer>
    {client => (
      <button className="button" onClick={() => signOut(client, history)}>
        Sign Out
      </button>
    )}
  </ApolloConsumer>
);

export default withRouter(Signout);
