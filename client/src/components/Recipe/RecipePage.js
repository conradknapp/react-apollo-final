import React from "react";
import { withRouter } from "react-router-dom";

import { Query } from "react-apollo";
import { GET_RECIPE } from "../../queries";
import LikeButton from "./LikeButton";

const RecipePage = ({ match }) => {
  const { _id } = match.params;
  return (
    <Query query={GET_RECIPE} variables={{ _id }}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading</div>;
        if (error) return <div>Error</div>;
        // console.log(data);
        return (
          <div>
            <div
              style={{
                background: `url(${
                  data.getRecipe.imageUrl
                }) center center / cover no-repeat`
              }}
              className="recipe-image"
            />
            <div className="recipe-body">
              <div className="recipe-body__header">
                <h2 className="recipe-body__title">
                  <strong>{data.getRecipe.name}</strong>
                </h2>
                <h5>
                  <strong>{data.getRecipe.category}</strong>
                </h5>
                <p>
                  Created by <strong>{data.getRecipe.username}</strong>
                </p>
                <p>
                  {data.getRecipe.likes}{" "}
                  <span role="img" aria-label="heart">
                    ❤️
                  </span>
                </p>
              </div>
              <blockquote className="recipe-body__description">
                {data.getRecipe.description}
              </blockquote>
              <h3 className="recipe-body__instructions-title">Instructions</h3>
              <div
                className="recipe-body__instructions"
                dangerouslySetInnerHTML={{
                  __html: data.getRecipe.instructions
                }}
              />
              <LikeButton _id={_id} />
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default withRouter(RecipePage);
