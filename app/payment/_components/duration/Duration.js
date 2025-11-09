import React from "react";
import Image from "next/image";
import styles from "./duration.module.css";
import { Plus_Jakarta_Sans } from "next/font/google";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
const Duration = ({ img, title, value, editIcon }) => {
  return (
    <div className={styles.container}>
      <div
        style={{ padding: !img && "2.2rem 1.8rem" }}
        className={styles.header}
      >
        <div className={styles.headerLeft}>
          {img && <Image src={img} alt={title} width={35} height={46} />}
          <p className={styles.title}>{title}</p>
        </div>
        {editIcon && (
          <Image
            className={styles.editIcon}
            src={"/svg/edit-icon.svg"}
            alt="edit"
            width={24}
            height={24}
          />
        )}
      </div>
      <div className={styles.value}>
        <p className={`${styles.valueTitle} ${plusJakartaSans.className}`}>
          {value}
        </p>
      </div>
    </div>
  );
};

export default Duration;
