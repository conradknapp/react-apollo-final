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
            <div className="article">
              <div className="article-header">
                <h2 class="article-title">
                  <strong>{data.getRecipe.name}</strong>
                </h2>
                <p>
                  <strong>{data.getRecipe.category}</strong>
                </p>
                <p>
                  Created By <strong>{data.getRecipe.username}</strong>
                </p>
                <p>{data.getRecipe.likes} Likes</p>
              </div>
              <blockquote className="article-description">
                {data.getRecipe.description}
              </blockquote>
              <h3 className="instructions-title">Instructions</h3>
              <div
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
