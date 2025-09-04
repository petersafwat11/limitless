import React from "react";
import styles from "./eligability.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500"],
});
const Eligability = ({ data }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
          {data.title}
        </h3>
        <p className={styles.description}>{data.description}</p>
      </div>
      <div className={styles.eligibility}>
        <div className={styles.first}>
          <div className={styles.header}>
            <Image
              src={data.first.img.src}
              alt="arrow-right"
              width={data.first.img.width}
              height={data.first.img.height}
            />
            <h4 className={`${styles.title} ${plusJakartaSans.className}`}>
              {data.first.title}
            </h4>
          </div>
          <div className={styles.features}>
            {data.first.features.map((item, index) => (
              <div className={styles.feature} key={index}>
                <Image
                  src={"/svg/gray-check.svg"}
                  alt="arrow-right"
                  width={24}
                  height={24}
                />
                <p className={`${styles.featureText} ${manrope.className}`}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.second}>
          <div className={styles.header}>
            <Image
              src={data.second.img.src}
              alt="arrow-right"
              width={data.second.img.width}
              height={data.second.img.height}
            />
            <h4 className={`${styles.title} ${plusJakartaSans.className}`}>
              {data.second.title}
            </h4>
          </div>
          <div className={styles.features}>
            {data.second.features.map((item, index) => (
              <div className={styles.feature} key={index}>
                <Image
                  src={"/svg/gray-check.svg"}
                  alt="arrow-right"
                  width={24}
                  height={24}
                />
                <p className={`${styles.featureText} ${manrope.className}`}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eligability;
