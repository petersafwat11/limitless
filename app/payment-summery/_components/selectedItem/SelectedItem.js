import React from "react";
import Image from "next/image";
import styles from "./selectedItem.module.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const SelectedItem = ({ item, title, description, img }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.imgContainer}>
          <Image src={img} alt={title} height={70} width={50} />
        </div>
        <div className={styles.headerContent}>
          <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
            {title}
          </h3>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
      <div className={`${styles.selectionItem} ${styles.selectedItem}`}>
        <Image src="/svg/included.svg" alt="check" width={18} height={18} />
        {item}
      </div>
    </div>
  );
};

export default SelectedItem;
