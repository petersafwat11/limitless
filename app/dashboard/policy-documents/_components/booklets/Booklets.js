import React from "react";
import styles from "./booklets.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
const Booklets = () => {
  return (
    <div className={styles.container}>
      <span className={styles.blueBackground}></span>
      <span className={styles.blueBackground2}></span>
      <span className={styles.blueBackground3}></span>
      <div className={styles.first}>
        <h4 className={`${styles.title} ${plusJakartaSans.className}`}>
          Insurance pilicy booklets
        </h4>
        <p className={styles.description}>
          For RAC breakdown cover claims, please call 0345 168 5586.
        </p>
      </div>{" "}
      <div className={styles.second}>
        <div className={styles.download}>
          <Image
            src="/svg/download.svg"
            alt="download"
            width={24}
            height={24}
          />
        </div>

        <p className={styles.downloadText}>Dowload car policy booklet</p>
      </div>
    </div>
  );
};

export default Booklets;
