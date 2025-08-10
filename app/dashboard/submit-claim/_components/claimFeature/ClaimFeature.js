import React from "react";
import styles from "./claimFeature.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400"],
});

const ClaimFeature = ({ img, title, description, features, btnText }) => {
  return (
    <div className={styles.container}>
      <Image
        className={styles.img}
        src={img.src}
        alt="claimFeature"
        width={img.width}
        height={img.height}
      />
      <div className={styles.claimFeatureText}>
        <h3
          className={`${styles.claimFeatureTitle} ${plusJakartaSans.className}`}
        >
          {title}
        </h3>
        <p className={`${styles.claimFeatureDescription} ${manrope.className}`}>
          {description}
        </p>
      </div>
      <div className={styles.features}>
        {features.map((item, index) => (
          <div key={index} className={styles.feature}>
            <Image
              src={"/svg/included.svg"}
              alt="feature"
              width={24}
              height={24}
            />
            <p className={styles.featureText}>{item}</p>
          </div>
        ))}
      </div>
      <button className={styles.btn}>{btnText}</button>
    </div>
  );
};

export default ClaimFeature;
