import React from "react";
import styles from "./ourBenifits.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700", "300"],
});

const OurBenifits = ({ benifits, title, description }) => {
  const words = title.split(" ");
  const lastTwoWords = words.slice(-2).join(" "); // last 2 words
  const withoutLastTwoWords = words.slice(0, -2).join(" "); // everything except last 2

  return (
    <div className={`${styles.container}`}>
      <div className={styles.top}>
        <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
          {withoutLastTwoWords}
          <span>{lastTwoWords}</span>
        </h2>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      <div className={styles.benifits}>
        {benifits.map((benifit, index) => (
          <div className={styles.benifit} key={index}>
            <div className={styles.imgContainer}>
              <Image
                className={styles.img}
                src={benifit.img.src}
                alt={benifit.img.alt}
                width={benifit.img.width}
                height={benifit.img.height}
              />
            </div>
            <h3
              className={`${styles.benifitTitle} ${plusJakartaSans.className} `}
            >
              {benifit.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurBenifits;
