import React from "react";
import styles from "./paymentFailed.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500"],
});
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500"],
});
const PaymentFailed = () => {
  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <Image
          className={styles.exit}
          src="/svg/exit.svg"
          alt="payment-failed"
          width={13}
          height={13}
        />
      </div>
      <div className={styles.body}>
        <Image
          className={styles.failedIcon}
          src="/svg/failed.svg"
          alt="payment-failed"
          width={140}
          height={148}
        />
        <div className={styles.textWrapper}>
          <p className={`${styles.title} ${plusJakartaSans.className}`}>
            Payment failed
          </p>
          <p className={`${styles.description} ${manrope.className}`}>
            Please check your payment details or try another method{" "}
          </p>
        </div>
      </div>
      <button className={styles.button}>Try again</button>
    </div>
  );
};

export default PaymentFailed;
