import React from "react";
import { Mutation } from "react-apollo";

import withSession from "../withSession";
import { LIKE_RECIPE, UNLIKE_RECIPE, GET_RECIPE } from "../../queries";

class LikeButton extends React.Component {
  state = {
    liked: false,
    username: ""
  };

  componentDidMount() {
    const { loading, session, _id } = this.props;
    if (!loading && !!session.getCurrentUser) {
      const { favorites, username } = this.props.session.getCurrentUser;
      this.setState({ username });
      const previouslyLiked = favorites.findIndex(fav => fav._id === _id) > -1;
      if (previouslyLiked) {
        this.setState({ liked: true });
      }
    }
  }

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
        // console.log(data);
        await this.props.refetch();
      });
    } else {
      unlikeRecipe().then(async ({ data }) => {
        // console.log(data);
        await this.props.refetch();
      });
    }
  };

  updateLike = (cache, { data: { likeRecipe } }) => {
    const { getRecipe } = cache.readQuery({
      query: GET_RECIPE,
      variables: { _id: this.props._id, username: this.state.username }
    });

    cache.writeQuery({
      query: GET_RECIPE,
      variables: { _id: this.props._id, username: this.state.username },
      data: {
        getRecipe: { ...getRecipe, likes: getRecipe.likes + 1 }
      }
    });
  };

  updateUnlike = (cache, { data: { unlikeRecipe } }) => {
    const { getRecipe } = cache.readQuery({
      query: GET_RECIPE,
      variables: { _id: this.props._id, username: this.state.username }
    });

    cache.writeQuery({
      query: GET_RECIPE,
      variables: { _id: this.props._id, username: this.state.username },
      data: {
        getRecipe: { ...getRecipe, likes: getRecipe.likes - 1 }
      }
    });
  };

  render() {
    const { _id } = this.props;
    const { username } = this.state;

    return (
      <Mutation
        mutation={UNLIKE_RECIPE}
        variables={{ _id, username }}
        update={this.updateUnlike}
      >
        {unlikeRecipe => (
          <Mutation
            mutation={LIKE_RECIPE}
            variables={{ _id, username }}
            update={this.updateLike}
          >
            {likeRecipe =>
              username && (
                <button
                  onClick={() => this.handleClick(likeRecipe, unlikeRecipe)}
                >
                  {this.state.liked ? "Unlike" : "Like"}
                </button>
              )
            }
          </Mutation>
        )}
      </Mutation>
    );
  }
}

export default withSession(LikeButton);
