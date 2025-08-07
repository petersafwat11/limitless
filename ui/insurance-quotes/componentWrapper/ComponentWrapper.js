import Image from "next/image";
import React from "react";
import styles from "./componentWrapper.module.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ComponentWrapper = ({ children, title, icon }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image
          src="/svg/insurance-quote.svg"
          alt="terms-and-conditions"
          width={icon?.width || 100}
          height={icon?.height || 100}
        />
        <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
          {title}
        </h3>
      </div>

      {children}
    </div>
  );
};

export default ComponentWrapper;
