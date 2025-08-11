import React from "react";
import styles from "./rightService.module.css";
import Card from "@/app/comming-soon/_components/card/Card";
import { features } from "@/app/comming-soon/data";
const RightService = () => {
  return (
    <div className={styles.container}>
      <div className={styles.first}>
        <h2 className={styles.title}>Choose a Service that’s right for you</h2>
        <p className={styles.description}>
          {" "}
          Lorem ipsum dolor sit amet consectetur. Arcu placerat suspendisse
          aenean cras aliquam est pellentesque. Lobortis integer orci quam
          consectetur accumsan sapien. Urna maecenas viverra sapien neque
          ullamcorper.{" "}
        </p>
      </div>
      <div className={styles.cardsContainer}>
        {features.map((feature, index) => (
          <Card key={index} {...feature} />
        ))}
      </div>
    </div>
  );
};

export default RightService;
