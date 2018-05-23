import React from "react";
import { Query, Mutation } from "react-apollo";
import { Link } from "react-router-dom";

import { GET_USER_RECIPES, DELETE_USER_RECIPE } from "../../queries";

const handleDelete = deleteUserRecipe => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this recipe?"
  );
  if (confirmDelete) {
    deleteUserRecipe();
  }
};

const UserRecipes = ({ loading, session }) => {
  const username = !loading ? session.getCurrentUser.username : "";
  return (
    <Query query={GET_USER_RECIPES} variables={{ username }}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading</div>;
        if (error) return <div>Error</div>;
        // console.log(data);
        return (
          <ul className="App">
            <h3>Your Recipes</h3>
            {!data.getUserRecipes.length && (
              <p>You have not added any recipes yet</p>
            )}
            {data.getUserRecipes.map(recipe => (
              <li key={recipe._id}>
                <Link to={`/recipes/${recipe._id}`}>
                  <p>{recipe.name}</p>
                </Link>
                <p>Likes: {recipe.likes}</p>
                <Mutation
                  mutation={DELETE_USER_RECIPE}
                  variables={{ _id: recipe._id }}
                  update={(cache, { data: { deleteUserRecipe } }) => {
                    const { getUserRecipes } = cache.readQuery({
                      query: GET_USER_RECIPES,
                      variables: { username }
                    });
                    cache.writeQuery({
                      query: GET_USER_RECIPES,
                      variables: { username },
                      data: {
                        getUserRecipes: getUserRecipes.filter(
                          recipe => recipe._id !== deleteUserRecipe._id
                        )
                      }
                    });
                  }}
                >
                  {(deleteUserRecipe, attrs = {}) => (
                    <p
                      onClick={() => handleDelete(deleteUserRecipe)}
                      style={{ color: "red" }}
                    >
                      {attrs.loading ? "deleting..." : "X"}
                    </p>
                  )}
                </Mutation>
              </li>
            ))}
          </ul>
        );
      }}
    </Query>
  );
};

export default UserRecipes;
