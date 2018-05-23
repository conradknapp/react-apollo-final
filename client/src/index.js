import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
    <React.Fragment>
      <Navbar session={session} />
      <Route path="/" exact component={() => <App />} />
      <Route path="/search" exact component={() => <Search />} />
      <Route
        path="/signin"
        exact
        component={() => <Signin refetch={refetch} />}
      />
      <Route
        path="/signup"
        exact
        component={() => <Signup refetch={refetch} />}
      />
      <Route
        path="/profile"
        exact
        component={() => <Profile session={session} loading={loading} />}
      />
      <Route
        path="/recipe/add"
        exact
        component={() => <AddRecipe session={session} loading={loading} />}
      />
      <Route path="/recipes/:_id" exact component={() => <RecipePage />} />
    </React.Fragment>
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
