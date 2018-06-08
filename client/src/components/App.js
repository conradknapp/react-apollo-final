import React from "react";
import "./App.css";
import posed from "react-pose";

import { Query } from "react-apollo";
import { GET_ALL_RECIPES } from "../queries";
import RecipeItem from "./Recipe/RecipeItem";

const appProps = {
  open: {
    x: "0%",
    staggerChildren: 100
  },
  closed: {
    x: "-100%"
  }
};

const RecipeList = posed.ul(appProps);

class App extends React.Component {
  state = { isOpen: false };

  componentDidMount() {
    setTimeout(this.toggle, 200);
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    return (
      <div className="App">
        <h1 className="title">
          Find Recipes You <strong>Love</strong>
        </h1>
        <Query query={GET_ALL_RECIPES}>
          {({ data, loading, error }) => {
            if (loading) return <div>Loading</div>;
            if (error) return <div>Error</div>;
            // console.log(data);
            const { isOpen } = this.state;
            return (
              <RecipeList className="Cards" pose={isOpen ? "open" : "closed"}>
                {data.getAllRecipes.map(recipe => (
                  <RecipeItem key={recipe._id} {...recipe} />
                ))}
              </RecipeList>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default App;
