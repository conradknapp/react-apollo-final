import React from "react";
import { Link } from "react-router-dom";

const RecipeItem = ({ _id, name }) => (
  <Link to={`/recipes/${_id}`}>
    <li>{name}</li>
  </Link>
);

export default RecipeItem;
