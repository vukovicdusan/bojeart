import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/AnimationContainer.module.css";

const AnimationContainer = (props) => {
  let animationRef = useRef();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let config = {
      threshold: 0.4,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setShow(true);
        }
      });
    }, config);
    observer.observe(animationRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className={styles.animationContainer} ref={animationRef}>
      <div className={`${show ? styles.show : styles.hidden}`}>
        {props.children}
      </div>
    </div>
  );
};

export default AnimationContainer;
