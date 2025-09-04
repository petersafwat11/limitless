import React from "react";
import styles from "./chooseService.module.css";
import Card from "@/app/comming-soon/_components/card/Card";
import Image from "next/image";
import { features } from "@/app/comming-soon/data";
const ChooseService = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Image
          src="/svg/service.svg"
          alt="choose-service"
          width={58}
          height={58}
        />
        <h3 className={styles.title}>
          Choose a Service that’s<span> right for you </span>
        </h3>
        <p className={styles.description}>
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

export default ChooseService;
