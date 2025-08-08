import React from "react";
import styles from "./selectedItem2.module.css";
import Image from "next/image";
const SelectedItem2 = ({ option }) => {
  return (
    <div className={styles.container}>
      <div className={styles.option}>
        <Image src="/svg/included.svg" alt="check" width={18} height={18} />

        <div className={styles.optionContent}>
          <h4 className={styles.title}>{option.title}</h4>
          <p className={styles.description}>{option.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SelectedItem2;
