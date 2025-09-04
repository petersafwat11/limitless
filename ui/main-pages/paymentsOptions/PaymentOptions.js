import React from "react";
import styles from "./paymentsOptions.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
const PaymentOptions = () => {
  return (
    <div className={styles.container}>
      <h4 className={`${styles.title} ${plusJakartaSans.className}`}>
        You can pay for your short term insurance policy in several ways.
      </h4>
      <div className={styles.options}>
        <Image
          src={"/svg/visa.svg"}
          alt="arrow-right"
          width={207}
          height={114}
        />
        <Image
          src={"/svg/mastercard.svg"}
          alt="arrow-right"
          width={207}
          height={114}
        />
        <Image
          src={"/svg/american-express.svg"}
          alt="arrow-right"
          width={207}
          height={114}
        />
      </div>
    </div>
  );
};

export default PaymentOptions;
