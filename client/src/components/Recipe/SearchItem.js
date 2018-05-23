import React from "react";
import { Link } from "react-router-dom";

const SearchItem = ({ _id, name }) => (
  <Link to={`/recipes/${_id}`}>
    <li>{name}</li>
  </Link>
);

export default SearchItem;
