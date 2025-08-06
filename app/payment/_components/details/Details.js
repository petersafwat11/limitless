import React from "react";
import Image from "next/image";
import styles from "./details.module.css";
const Details = () => {
  return (
    <div>
      <div className={styles.header}>
        <Image
          src="/svg/insurance-quote.svg"
          alt="your-details"
          width={60}
          height={60}
        />
        <p className={styles.headerTitle}>Your Details</p>
      </div>
      {[
        { label: "ww", value: "Roland Maguire" },
        { label: "Date of Birth", value: "12/02/1990" },
        { label: "Licence Hold for", value: "5-8 Years" },
        { label: "Licence Expiry", value: "12/02/2025" },
      ].map((item, index) => (
        <div className={styles.item} key={index}>
          <p className={styles.label}>{item.label}</p>
          <p className={styles.value}>{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default Details;
