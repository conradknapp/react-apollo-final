import React from "react";
import "./App.css";
import posed from "react-pose";
import Spinner from "./Spinner";

import { Query } from "react-apollo";
import { GET_ALL_RECIPES } from "../queries";
import RecipeItem from "./Recipe/RecipeItem";

const appProps = {
  show: {
    x: "0%",
    staggerChildren: 100
  },
  hide: {
    x: "-100%"
  }
};

const RecipeList = posed.ul(appProps);

class App extends React.Component {
  state = {
    on: false
  };

  componentDidMount() {
    setTimeout(this.slideIn, 200);
  }

  slideIn = () => {
    this.setState({ shown: !this.state.shown });
  };

  render() {
    return (
      <div className="App">
        <h1 className="main-title">
          Find Recipes You <strong>Love</strong>
        </h1>
        <Query query={GET_ALL_RECIPES}>
          {({ data, loading, error }) => {
            if (loading) return <Spinner />;
            if (error) return <div>Error</div>;
            // console.log(data);
            const { shown } = this.state;
            return (
              <RecipeList className="cards" pose={shown ? "show" : "hide"}>
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
