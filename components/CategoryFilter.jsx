import React from "react";
import * as styles from "../styles/CategoryFilter.module.css";

const CategoryFilter = (props) => {
  const changeFilterHandler = (e) => {
    props.catFilterHandler(
      e.target.innerHTML.toLowerCase().split(" ").join("-")
    );
  };
  return (
    <ul className={`${styles.categoryWrap} [ wrap ]`}>
      {props.categories
        .filter((cat) => cat.author === props.filter)
        .map((cat) => (
          <li key={cat.slug}>
            <button
              onClick={changeFilterHandler}
              className="[ button ] [ button-ghost ]"
            >
              {cat.category}
            </button>
          </li>
          // <span className="spacer"></span>
        ))}
      <li>
        <button
          onClick={changeFilterHandler}
          className="[ button ] [ button-ghost ]"
        >
          Izložbe
        </button>
      </li>
    </ul>
  );
};

export default CategoryFilter;
