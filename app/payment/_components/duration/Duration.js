import React from "react";
import Image from "next/image";
import styles from "./duration.module.css";
const Duration = ({ img, title, value, editIcon }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Image src={img} alt={title} width={35} height={46} />
          <p className={styles.durationTitle}>{title}</p>
        </div>
        {editIcon && (
          <Image src={"/svg/edit-icon.svg"} alt="edit" width={24} height={24} />
        )}
      </div>
      <div className={styles.value}>
        <p className={styles.valueTitle}>{value}</p>
      </div>
    </div>
  );
};

export default Duration;
