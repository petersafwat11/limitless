import React from "react";
import styles from "./card.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
const Card = ({ title, value, img }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        {img && (
          <Image
            src={img.src}
            alt={title}
            width={img.width}
            height={img.height}
          />
        )}
        <h3 className={`${styles.title}`}>{title}</h3>
      </div>
      <p className={`${styles.value} ${plusJakartaSans.className}`}>{value}</p>
    </div>
  );
};

export default Card;
