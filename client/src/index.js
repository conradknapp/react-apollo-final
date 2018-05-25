import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import "./index.css";

// Import components
import AddRecipe from "./components/Recipe/AddRecipe";
import App from "./components/App";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile/Profile";
import RecipePage from "./components/Recipe/RecipePage";
import Search from "./components/Recipe/Search";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import withSession from "./components/withSession";

// import Apollo packages
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// Pass in GraphQL endpoint
const client = new ApolloClient({
  uri: "http://localhost:4444/graphql",
  fetchOptions: {
    credentials: "include"
  },
  request: operation => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  },
  onError: ({ networkError }) => {
    if (networkError) {
      console.log("Network Error", networkError);
    }
  }
});

// Root component - Where all routing is located
const Root = ({ session, loading, refetch }) => (
  <Router>
    <Fragment>
      <Navbar session={session} />
      <Switch>
        <Route path="/" exact render={() => <App />} />
        <Route path="/search" render={() => <Search />} />
        <Route path="/signin" render={() => <Signin refetch={refetch} />} />
        <Route path="/signup" render={() => <Signup refetch={refetch} />} />
        <Route
          path="/profile"
          render={() => <Profile session={session} loading={loading} />}
        />
        <Route
          path="/recipe/add"
          render={() => <AddRecipe session={session} loading={loading} />}
        />
        <Route path="/recipes/:_id" render={() => <RecipePage />} />
        <Redirect to="/signin" />
      </Switch>
    </Fragment>
  </Router>
);

const WrappedRoot = withSession(Root);

// Wrap App component with ApolloProvider
ReactDOM.render(
  <ApolloProvider client={client}>
    <WrappedRoot />
  </ApolloProvider>,
  document.getElementById("root")
);

// Hot reloading
if (module.hot) {
  module.hot.accept();
}
