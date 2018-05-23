import { gql } from "apollo-boost";

/* Recipes Queries*/
export const GET_RECIPE = gql`
  query($_id: ID!) {
    getRecipe(_id: $_id) {
      _id
      name
      description
      category
      instructions
      createdDate
      likes
      username
    }
  }
`;

export const GET_ALL_RECIPES = gql`
  query {
    getAllRecipes {
      _id
      name
      description
      category
      instructions
      createdDate
      likes
      username
    }
  }
`;

export const SEARCH_RECIPES = gql`
  query($searchTerm: String) {
    searchRecipes(searchTerm: $searchTerm) {
      _id
      name
      description
      category
      instructions
      createdDate
      likes
      username
    }
  }
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
      _id
      name
      description
      instructions
      createdDate
      category
      username
      likes
    }
  }
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
