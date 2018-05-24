import React from "react";
import { Mutation } from "react-apollo";

import { LIKE_RECIPE, UNLIKE_RECIPE, GET_RECIPE } from "../../queries";

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

  updateLike = (cache, { data: { likeRecipe } }) => {
    const { getRecipe } = cache.readQuery({
      query: GET_RECIPE,
      variables: { _id: this.props._id }
    });

    cache.writeQuery({
      query: GET_RECIPE,
      variables: { _id: this.props._id },
      data: {
        getRecipe: { ...getRecipe, likes: getRecipe.likes + 1 }
      }
    });
  };

  updateUnlike = (cache, { data: { unlikeRecipe } }) => {
    const { getRecipe } = cache.readQuery({
      query: GET_RECIPE,
      variables: { _id: this.props._id }
    });

    cache.writeQuery({
      query: GET_RECIPE,
      variables: { _id: this.props._id },
      data: {
        getRecipe: { ...getRecipe, likes: getRecipe.likes - 1 }
      }
    });
  };

  render() {
    const { _id } = this.props;

    return (
      <Mutation
        mutation={UNLIKE_RECIPE}
        variables={{ _id }}
        update={this.updateUnlike}
      >
        {unlikeRecipe => (
          <Mutation
            mutation={LIKE_RECIPE}
            variables={{ _id }}
            update={this.updateLike}
          >
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
