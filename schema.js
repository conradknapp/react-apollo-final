exports.typeDefs = `
  type Recipe {
    _id: ID
    name: String
    imageUrl: String!
    description: String
    category: String
    instructions: String
    createdDate: String
    likes: Int
    username: String
  }

  type User {
    _id: ID
    username: String! @unique
    password: String!
    email: String!
    joinDate: String!
    favorites: [Recipe]
  }

  type Token {
    token: String!
  }

  type Query {
    getRecipe(_id: ID): Recipe
    getAllRecipes: [Recipe]
    searchRecipes(searchTerm: String): [Recipe]

    getCurrentUser: User
    getUserRecipes(username: String): [Recipe]
  }

  type Mutation {
    addRecipe(name: String, imageUrl: String!, category: String, description: String, instructions: String, username: String): Recipe
    likeRecipe(_id: ID, username: String): Recipe
    unlikeRecipe(_id: ID, username: String): Recipe
    deleteUserRecipe(_id: ID, username: String): Recipe
    signinUser(username: String!, password: String!): Token!
    signupUser(username: String!, password: String!, email: String!): Token!
  }
`;
