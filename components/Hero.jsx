import React from "react";
import Region from "./layout/Region";
import * as styles from "../styles/Hero.module.css";
import AnimationContainer from "./AnimationContainer";
const Hero = () => {
  return (
    <Region>
      <AnimationContainer>
        <h1 className={styles.heroTitle}>
          BoJe<span className="main-color">Art</span>
        </h1>
      </AnimationContainer>
    </Region>
  );
};

export default Hero;
