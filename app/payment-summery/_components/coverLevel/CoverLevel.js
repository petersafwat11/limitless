import React from "react";
import styles from "./coverLevel.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const CoverLevel = () => {
  return (
    <div className={styles.container}>
      <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
        Current level of cover
      </h3>
      <div className={styles.summery}>
        <span className={styles.background}></span>
        <span className={styles.background2}></span>
        <span className={styles.background3}></span>

        <div className={styles.content}>
          <div className={styles.total}>
            <Image
              src="/svg/total-price.svg"
              alt="total"
              width={22}
              height={22}
            />
            <p className={`${styles.totalTitle} ${plusJakartaSans.className}`}>
              Total Price
            </p>
          </div>
          <p className={styles.totalPrice}>£120.00</p>
          <p className={styles.totalPriceDescription}>
            Insurance produce information Document
          </p>
        </div>

        <Image
          src="/svg/cover-level.svg"
          alt="vehicle-covered"
          width={100}
          height={100}
          className={styles.vehicleCovered}
        />
      </div>
      <div className={styles.header}>
        <div className={styles.headerItem}>
          <Image
            src="/svg/insurance-quote.svg"
            alt="order-summary"
            width={22}
            height={22}
          />
          <p className={styles.headerItemTitle}>Order Reference</p>
        </div>
        <p className={styles.headerItemValue}>#kL10AFJJ019</p>
      </div>
      <div className={styles.features}>
        {[
          "Wind screen cover",
          "European cover",
          "New vehicle replacement ( subject to criteria )",
          "Up to £200 for personal belongings",
          "Uninsured driver promise",
          "Country car",
        ].map((feature, index) => (
          <div className={styles.featureItem} key={index}>
            <Image
              src="/svg/included.svg"
              alt="included"
              width={26}
              height={26}
            />
            <p className={styles.featureItemTitle}>{feature}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoverLevel;
