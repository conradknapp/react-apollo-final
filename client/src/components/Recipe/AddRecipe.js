import React, { Component, Fragment } from "react";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";

import Error from "../Error";
import withAuth from "../withAuth";
import { ADD_RECIPE, GET_ALL_RECIPES } from "../../queries";

const initialState = {
  name: "",
  instructions: "",
  category: "Breakfast",
  description: "",
  username: ""
};

class AddRecipe extends Component {
  state = { ...initialState };

  componentDidMount() {
    if (!this.props.loading) {
      this.setState({
        username: this.props.session.getCurrentUser.username
      });
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event, addRecipe) => {
    event.preventDefault();
    addRecipe().then(async ({ data }) => {
      // console.log(data);
      this.clearState();
      this.props.history.push("/");
    });
  };

  clearState = () => {
    this.setState({ ...initialState });
  };

  validateForm = () => {
    const { name, instructions, category, description } = this.state;
    const isInvalid = !name || !instructions || !category || !description;
    return isInvalid;
  };

  updateCache = (cache, { data: { addRecipe } }) => {
    const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES });

    cache.writeQuery({
      query: GET_ALL_RECIPES,
      data: {
        getAllRecipes: [addRecipe, ...getAllRecipes]
      }
    });
  };

  render() {
    const { name, instructions, category, description, username } = this.state;
    console.log(this.state);
    return (
      <Fragment>
        <h2 className="App">Add Recipe</h2>
        <Mutation
          mutation={ADD_RECIPE}
          variables={{
            name,
            instructions,
            category,
            description,
            username
          }}
          update={this.updateCache}
        >
          {(addRecipe, { data, loading, error }) => (
            <form
              className="App"
              onSubmit={event => this.handleSubmit(event, addRecipe)}
            >
              <input
                name="name"
                onChange={this.handleChange}
                value={name}
                type="text"
                placeholder="Recipe Name"
              />
              <select
                name="category"
                value={category}
                onChange={this.handleChange}
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Snack">Snack</option>
                <option value="Dinner">Dinner</option>
              </select>
              <input
                name="description"
                onChange={this.handleChange}
                value={description}
                type="text"
                placeholder="Add Description"
              />
              <textarea
                name="instructions"
                value={instructions}
                onChange={this.handleChange}
                placeholder="Add instructions"
              />
              <button disabled={loading || this.validateForm()} type="submit">
                Add Recipe
              </button>
              {error && <Error error={error} />}
            </form>
          )}
        </Mutation>
      </Fragment>
    );
  }
}

export default withAuth(session => session && session.getCurrentUser)(
  withRouter(AddRecipe)
);
