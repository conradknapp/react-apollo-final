import React from "react";
import { Mutation } from "react-apollo";

import { LIKE_RECIPE, UNLIKE_RECIPE } from "../../queries";

class LikeButton extends React.Component {
  state = {
    liked: false
  };

  handleClick = (likeRecipe, unlikeRecipe) => {
    this.setState(
      prevState => ({
        liked: !prevState.liked
      }),
      () => this.handleLike(likeRecipe, unlikeRecipe)
    );
  };

  handleLike = (likeRecipe, unlikeRecipe) => {
    if (this.state.liked) {
      likeRecipe().then(async ({ data }) => {
        console.log(data);
      });
    } else {
      unlikeRecipe().then(async ({ data }) => {
        console.log(data);
      });
    }
  };

  render() {
    const { _id } = this.props;

    return (
      <Mutation mutation={UNLIKE_RECIPE} variables={{ _id }}>
        {unlikeRecipe => (
          <Mutation mutation={LIKE_RECIPE} variables={{ _id }}>
            {likeRecipe => (
              <button
                onClick={() => this.handleClick(likeRecipe, unlikeRecipe)}
              >
                {this.state.liked ? "Liked!" : "Like"}
              </button>
            )}
          </Mutation>
        )}
      </Mutation>
    );
  }
}

export default LikeButton;
