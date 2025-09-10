import React from "react";
import styles from "./serviceCovered.module.css";
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
const ServiceCovered = ({ title, description, covered, unCovered }) => {
  const words = title.split(" ");
  const lastThreeWords = words.slice(-3).join(" "); // last 2 words
  const withoutLastThreeWords = words.slice(0, -3).join(" "); // everything except last 2
  return (
    <div className={styles.container}>
      <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
        {withoutLastThreeWords}
        <span>{lastThreeWords}</span>
      </h3>

      <div className={styles.content}>
        <div className={styles.covered}>
          <div className={styles.header}>
            <Image
              src={"/svg/covered.svg"}
              alt="arrow-right"
              width={89}
              height={64}
            />
            <h4 className={styles.coveredTitle}>{covered.title}</h4>
          </div>
          <div className={styles.features}>
            {covered.features.map((feature, index) => (
              <div className={styles.feature} key={index}>
                <Image
                  src={"/svg/covered-check.svg"}
                  alt="arrow-right"
                  width={24}
                  height={24}
                />
                <p className={styles.featureText}>{feature}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.unCovered}>
          <div className={styles.header}>
            <Image
              src={"/svg/uncovered.svg"}
              alt="arrow-right"
              width={89}
              height={64}
            />
            <h4 className={styles.unCoveredTitle}>{unCovered.title}</h4>
          </div>
          <div className={styles.features}>
            {unCovered.features.map((feature, index) => (
              <div className={styles.feature} key={index}>
                <Image
                  src={"/svg/covered-check.svg"}
                  alt="arrow-right"
                  width={24}
                  height={24}
                />
                <p className={styles.featureText}>{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <Image
          src={"/svg/covered-title.svg"}
          alt="arrow-right"
          width={89}
          height={60}
        />
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default ServiceCovered;
