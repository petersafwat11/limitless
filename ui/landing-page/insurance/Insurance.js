import React from "react";
import GetQuote from "../../getQuote/getQuote";
import styles from "./insurance.module.css";
import { features } from "./data";
import Feature from "../../feature/Feature";
const Insurance = () => {
  return (
    <div className={styles.container}>
      <GetQuote />
      <div className={styles.features}> 
        {features.map((feature) => (
          <Feature key={feature.title} {...feature} />
        ))}
      </div>
    </div>
  );
};

export default Insurance;
