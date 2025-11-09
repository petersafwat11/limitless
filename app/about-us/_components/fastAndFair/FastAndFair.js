import React from "react";
import styles from "./fastAndFair.module.css";
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
const FastAndFair = () => {
  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        src="/svg/fast-fair.svg"
        alt="fast-and-fair"
        width={584}
        height={515}
      />
      <div className={styles.content}>
        <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
          Fast. <span>Flexible. Fair.</span>
        </h2>
        <p className={`${styles.description} ${manrope.className}`}>
          Our policies are designed to adapt to your life, not the other way
          around. Whether you need short-term cover, specialist insurance, or a
          flexible plan to match your driving habits, we’ve got options to suit
          you. From first-time drivers to those with complex histories, we make
          it easy to find the right cover on your terms. We treat every customer
          with transparency and respect, offering fair prices and honest advice.
          No hidden fees, no judgment, just straightforward insurance that puts
          you in control.{" "}
        </p>
      </div>
    </div>
  );
};

export default FastAndFair;
