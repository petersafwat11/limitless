import React from "react";
import Image from "next/image";
import styles from "./details.module.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import InputWithData2 from "@/ui/inputs/InputWithData2/InputWithData2";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
const Details = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image
          src="/svg/insurance-quote.svg"
          alt="your-details"
          width={60}
          height={60}
          className={styles.icon}
        />
        <p className={`${styles.headerTitle} ${plusJakartaSans.className}`}>
          Your Details
        </p>
      </div>
      <div className={styles.content}>
        {[
          { label: "Full Name", value: "Roland Maguire" },
          { label: "Date of Birth", value: "12/02/1990", type: "date" },
          { label: "Licence Hold for", value: "5-8 Years" },
          { label: "Licence Expiry", value: "12/02/2025" },
        ].map((item, index) => (
          <InputWithData2
            item={item}
            index={index}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Details;
