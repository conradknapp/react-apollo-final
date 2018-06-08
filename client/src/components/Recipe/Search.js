import React from "react";
import { Query, ApolloConsumer } from "react-apollo";

import { SEARCH_RECIPES } from "../../queries";
import SearchItem from "./SearchItem";

class Search extends React.Component {
  state = {
    recipes: []
  };

  handleChange = ({ searchRecipes }) => {
    this.setState({
      recipes: searchRecipes
    });
  };

  render() {
    const { recipes } = this.state;

    return (
      <Query query={SEARCH_RECIPES}>
        {({ data, loading, error }) => (
          <ApolloConsumer>
            {client => (
              <div className="App">
                <input
                  type="search"
                  className="search"
                  name="searchTerm"
                  placeholder="Search for Recipes"
                  onChange={async event => {
                    event.persist();
                    const { data } = await client.query({
                      query: SEARCH_RECIPES,
                      variables: { searchTerm: event.target.value }
                    });
                    this.handleChange(data);
                  }}
                />
                <ul className="App">
                  {recipes.map(recipe => (
                    <SearchItem key={recipe._id} {...recipe} />
                  ))}
                </ul>
              </div>
            )}
          </ApolloConsumer>
        )}
      </Query>
    );
  }
}

export default Search;
