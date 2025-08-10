import React from "react";
import styles from "./temporaryCover.module.css";
import Card from "@/app/comming-soon/_components/card/Card";
import { features } from "./data";
const TemporaryCover = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        The cover you need for the duration you want{" "}
      </h3>
      <div className={styles.cardsContainer}>
        {features.map((feature, index) => (
          <Card key={index} {...feature} />
        ))}
      </div>
    </div>
  );
};

export default TemporaryCover;
