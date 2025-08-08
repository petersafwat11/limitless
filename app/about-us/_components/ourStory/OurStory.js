import React from "react";
import styles from "./ourStory.module.css";
import Image from "next/image";
const OurStory = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Our Story</h2>
      <p className={styles.description}>
        Lorem ipsum dolor sit amet consectetur. Nec lorem tempus fringilla urna
        accumsan pellentesque neque. Augue integer pharetra donec scelerisque.{" "}
      </p>
      <div className={styles.cardsContainer}>
        <div className={styles.arrows}>
          <div className={styles.arrow}></div>
          <div className={styles.arrow}></div>
        </div>
        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.header}>
              <p className={styles.year}>2019</p>
              <Image
                src="/svg/year-icon.svg"
                alt="year-icon"
                width={42}
                height={42}
                className={styles.yearIcon}
              />
            </div>
            <p className={styles.content}>
              <h4 className={styles.title}>Lorem ipsum dolor </h4>
              <p className={styles.description}>
                Lorem ipsum dolor sit amet consectetur. Nec lorem tempus
                fringilla urna accumsan pellentesque neque. Augue integer
                pharetra donec scelerisque.{" "}
              </p>
            </p>
          </div>
        </div>
      </div>
      <div className={styles.yearsItems}>
        {[2019, 2020, 2021, 2022, 2023, 2024, 2025].map((year) => (
          <div className={styles.yearItem} key={year}>
            {year}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurStory;
