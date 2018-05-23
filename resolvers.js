const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// We need to create and return a token when the user both signs up and signs out; therefore we need to use this function in both cases
const createToken = async (user, secret, expiresIn) => {
  const { username, password } = user;
  return await jwt.sign({ username, password }, secret, { expiresIn });
};

exports.resolvers = {
  Query: {
    getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) {
        return null;
      }
      const user = await User.findOne({
        username: currentUser.username
      }).populate({
        path: "favorites",
        model: "Recipe"
      });
      return user;
    },
    getRecipe: async (root, { _id }, { Recipe }) => {
      return await Recipe.findOne({ _id });
    },
    getAllRecipes: async (root, args, { Recipe }) => {
      return await Recipe.find().sort({ createdDate: "desc" });
    },
    searchRecipes: async (root, { searchTerm }, { Recipe }) => {
      if (searchTerm) {
        const searchResults = await Recipe.find({
          $text: { $search: searchTerm }
        }).sort({ createdDate: "desc" });
        return searchResults;
      }
    }
  },
  Mutation: {
    addRecipe: async (
      root,
      { name, description, instructions, category, username },
      { Recipe }
    ) => {
      const newRecipe = new Recipe({
        name,
        description,
        category,
        instructions,
        username
      }).save();
      return newRecipe;
    },
    signinUser: async (root, { username, password }, { User }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("No user found");
      }
      return { token: createToken(user, process.env.SECRET, "1h") };
    },
    signupUser: async (root, { username, password, email }, { User }) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error("User already exists");
      }
      const newUser = await new User({
        username,
        password,
        email
      }).save();
      return { token: createToken(newUser, process.env.SECRET, "1h") };
    }
  }
};
