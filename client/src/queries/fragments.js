import { gql } from "apollo-boost";

export const recipeFragments = {
  recipe: gql`
    fragment EntireRecipe on Recipe {
      _id
      name
      imageUrl
      description
      category
      instructions
      createdDate
      likes
      username
    }
  `
};
