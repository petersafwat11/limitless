import React from "react";
import styles from "./temporaryCover.module.css";
import Card from "@/app/coming-soon/_components/card/Card";
import { features } from "./data";
import { Plus_Jakarta_Sans } from "next/font/google";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
const TemporaryCover = () => {
  return (
    <div className={styles.container}>
      <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
        The cover you need for the <span>duration you want</span>{" "}
      </h3>
      <div className={styles.cardsContainer}>
        {features.map((feature, index) => (
          <Card key={index} {...feature}  />
        ))}
      </div>
    </div>
  );
};

export default TemporaryCover;
