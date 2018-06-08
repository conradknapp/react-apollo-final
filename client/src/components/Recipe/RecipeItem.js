import React from "react";
import { Link } from "react-router-dom";
import posed from "react-pose";

const recipeItemProps = {
  open: { opacity: 1 },
  closed: { opacity: 0 }
};

const RecipeItem = posed.li(recipeItemProps);

export default ({ _id, name, imageUrl, category }) => (
  <RecipeItem
    style={{
      background: `url(${imageUrl}) center center / cover no-repeat`
    }}
    className="Card"
  >
    <span className={category}>{category}</span>
    <div className="CardText">
      <Link to={`/recipes/${_id}`}>
        <h4>{name}</h4>
      </Link>
    </div>
  </RecipeItem>
);
