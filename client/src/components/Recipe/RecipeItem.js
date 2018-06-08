import React from "react";
import { Link } from "react-router-dom";
import posed from "react-pose";

const recipeItemProps = {
  show: { opacity: 1 },
  hide: { opacity: 0 }
};

const RecipeItem = posed.li(recipeItemProps);

export default ({ _id, name, imageUrl, category }) => (
  <RecipeItem
    style={{
      background: `url(${imageUrl}) center center / cover no-repeat`
    }}
    className="card"
  >
    <span className={category}>{category}</span>
    <div className="card-text">
      <Link to={`/recipes/${_id}`}>
        <h4>{name}</h4>
      </Link>
    </div>
  </RecipeItem>
);
