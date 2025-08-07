import React from "react";
import styles from "./headerTitle.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
const HeaderTitle = ({ title }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image
          src="/svg/insurance-quote.svg"
          alt="terms-and-conditions"
          width={42}
          height={42}
        />
        <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
          {title}
        </h3>
      </div>
      <Image
        src="/svg/edit-icon.svg"
        alt="edit icon"
        width={24}
        height={24}
      />
    </div>
  );
};

export default HeaderTitle;
