import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";

import { GET_USER_RECIPES } from "../../queries";

const UserRecipes = ({ loading, session }) => {
  const username = !loading ? session.getCurrentUser.username : "";
  return (
    <Query query={GET_USER_RECIPES} variables={{ username }}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading</div>;
        if (error) return <div>Error</div>;
        console.log(data);
        return (
          <ul className="App">
            <h4>Your Recipes</h4>
            {!data.getUserRecipes.length && (
              <p>You have not added any recipes yet</p>
            )}
            {data.getUserRecipes.map(recipe => (
              <li key={recipe._id}>
                <Link to={`/recipes/${recipe._id}`}>
                  <p>{recipe.name}</p>
                </Link>
                <p>Likes: {recipe.likes}</p>
              </li>
            ))}
          </ul>
        );
      }}
    </Query>
  );
};

export default UserRecipes;
