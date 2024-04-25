import React, { useState } from "react";
import * as styles from "../styles/CategoryFilter.module.css";
import categoriesPerAuthorHandler from "../helpers/categoriesPerAuthorHandlere";
import AnimationContainer from "./AnimationContainer";

const CategoryFilter = (props) => {
  const [activeBtn, setActiveBtn] = useState();
  const changeFilterHandler = (e) => {
    let btn = e.target.innerHTML;
    setActiveBtn(btn.toLowerCase());
    props.catFilterHandler(btn.toLowerCase().split(" ").join("-"));
  };
  return (
    // <AnimationContainer>
    <ul className={`${styles.categoryWrap} [ wrap ]`}>
      {categoriesPerAuthorHandler(props.categories, props.filter).map((cat) => (
        <li key={cat.slug}>
          <button
            onClick={changeFilterHandler}
            className={`${
              cat.category === activeBtn && styles.active
            } [ button ] [ button-ghost ]`}
          >
            {cat.category}
          </button>
        </li>
        // <span className="spacer"></span>
      ))}
      <li>
        <button
          onClick={changeFilterHandler}
          className={`${
            "izložbe" === activeBtn && styles.active
          } [ button ] [ button-ghost ]`}
        >
          Izložbe
        </button>
      </li>
    </ul>
    // </AnimationContainer>
  );
};

export default CategoryFilter;
