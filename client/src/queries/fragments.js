import { gql } from "apollo-boost";

export const recipeFragments = {
  recipe: gql`
    fragment EntireRecipe on Recipe {
      _id
      name
      description
      category
      instructions
      createdDate
      likes
      username
    }
  `
};
