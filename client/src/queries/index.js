import { gql } from "apollo-boost";

import { recipeFragments } from "./fragments";

/* Recipes Queries*/
export const GET_RECIPE = gql`
  query($_id: ID!) {
    getRecipe(_id: $_id) {
      ...EntireRecipe
    }
  }
  ${recipeFragments.recipe}
`;

export const GET_ALL_RECIPES = gql`
  query {
    getAllRecipes {
      ...EntireRecipe
    }
  }
  ${recipeFragments.recipe}
`;

export const SEARCH_RECIPES = gql`
  query($searchTerm: String) {
    searchRecipes(searchTerm: $searchTerm) {
      ...EntireRecipe
    }
  }
  ${recipeFragments.recipe}
`;

/* Recipe Mutations */
export const ADD_RECIPE = gql`
  mutation(
    $name: String!
    $description: String!
    $instructions: String!
    $category: String!
    $username: String!
  ) {
    addRecipe(
      name: $name
      description: $description
      instructions: $instructions
      category: $category
      username: $username
    ) {
      ...EntireRecipe
    }
  }
  ${recipeFragments.recipe}
`;

/* User Queries */
export const GET_USER_RECIPES = gql`
  query($username: String) {
    getUserRecipes(username: $username) {
      _id
      name
      description
      createdDate
      likes
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      _id
      username
      email
      joinDate
      favorites {
        _id
      }
    }
  }
`;

/* User Mutations */
export const DELETE_USER_RECIPE = gql`
  mutation($_id: ID) {
    deleteUserRecipe(_id: $_id) {
      _id
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      token
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;
