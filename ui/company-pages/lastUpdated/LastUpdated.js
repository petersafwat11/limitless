import React from "react";
import styles from "./lastUpdated.module.css";
import Image from "next/image";
const LastUpdated = ({ data }) => {
  return (
    <div className={styles.lastUpdated}>
      <div className={styles.title}>
        <Image
          className={styles.lastUpdatedIcon}
          src="/svg/last-updated.svg"
          alt="lastUpdated"
          width={42}
          height={42}
        />
        <p className={styles.header}>{data.title}</p>
      </div>
      <p className={styles.description}>{data.description}</p>
    </div>
  );
};

export default LastUpdated;
