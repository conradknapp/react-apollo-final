const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const Recipe = require("./models/Recipe");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

// GraphQL-Express Packages
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

// Brings in Schema and Resolvers
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");

// Creates Executable Schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// Connects to Database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch(err => console.error(err));

// Initializes app
const app = express();

// Adds cors middleware
// the backend must allow credentials from the requested origin
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};
app.use(cors(corsOptions));

// Check if we have a token
app.use(async (req, res, next) => {
  const token = req.headers["authorization"];
  if (token !== "null") {
    try {
      const currentUser = await jwt.verify(token, process.env.SECRET);
      req.currentUser = currentUser;
    } catch (err) {
      res.send(err);
    }
  }
  next();
});

// Sets up graphiql application at /graphiql
app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql"
  })
);

// Sets up Express middleware
app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress(async ({ currentUser }) => ({
    schema,
    context: {
      Recipe,
      User,
      secret: process.env.SECRET,
      currentUser
    }
  }))
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});
