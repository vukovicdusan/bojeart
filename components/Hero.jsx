import React from "react";
import Region from "./layout/Region";
import * as styles from "../styles/Hero.module.css";
import AnimationContainer from "./AnimationContainer";
const Hero = () => {
  return (
    <Region>
      <h1 className={styles.heroTitle}>
        <AnimationContainer>
          BoJe<span className="main-color">Art</span>
        </AnimationContainer>
      </h1>
    </Region>
  );
};

export default Hero;
