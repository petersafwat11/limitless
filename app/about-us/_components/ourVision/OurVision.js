import React from "react";
import styles from "./ourVision.module.css";
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
const OurVision = () => {
  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        src="/svg/vision.svg"
        alt="our-vision"
        width={584}
        height={515}
      />
      <div className={styles.content}>
        <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
          Our <span>Vision</span>
        </h2>
        <p className={`${styles.description} ${manrope.className}`}>
          {`At Limitless Cover, our vision is to make vehicle insurance
          accessible, affordable, and flexible for all drivers. We are dedicated
          to offering the cheapest rates on the market without compromising on
          quality or coverage. We believe that every driver, including those
          with convictions, deserves to have the right protection on the road.
          That’s why we strive to provide quick and flexible quotations,
          ensuring that everyone can find a policy that fits their needs.
          Whether you're a new driver or someone with a more complex history, we
          are committed to making insurance simple, affordable, and available
          for all.`}
        </p>
      </div>
    </div>
  );
};

export default OurVision;
