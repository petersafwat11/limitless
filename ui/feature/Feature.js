import React from "react";
import styles from "./feature.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Feature = ({ img, title, description }) => {
  return (
    <div className={styles.container}>
      <Image
        src={img.src}
        alt={img.alt}
        width={img.width}
        height={img.height}
        className={styles.img}
      />
      <div className={`${styles.content}`}>
        <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
          {title}
        </h3>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </div>
  );
};

export default Feature;
